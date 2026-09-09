interface ProjectBriefPayload {
  name?: unknown;
  contact?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
}

class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

function json(data: unknown, status = 200, extraHeaders?: HeadersInit) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json(
        { ok: false, message: "Метод не поддерживается." },
        405,
        { Allow: "POST" },
      );
    }

    try {
      const payload = (await request.json()) as ProjectBriefPayload;
      const website = cleanText(payload.website, 200);
      if (website) return json({ ok: true });

      const name = cleanText(payload.name, 80);
      const contact = cleanText(payload.contact, 160);
      const projectType = cleanText(payload.projectType, 120) || "Не выбран";
      const message = cleanText(payload.message, 2500);

      if (!name || !contact || !message) {
        throw new ApiError("Заполните имя, контакт и описание проекта.", 400);
      }

      const token = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;
      if (!token || !chatId) {
        throw new ApiError("Форма временно недоступна: Telegram ещё не настроен.", 503);
      }

      const telegramMessage = [
        "🚀 Новая заявка с портфолио",
        "",
        `Имя: ${name}`,
        `Контакт: ${contact}`,
        `Тип проекта: ${projectType}`,
        "",
        "Описание:",
        message,
      ].join("\n");

      const telegramResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          link_preview_options: { is_disabled: true },
        }),
        signal: AbortSignal.timeout(8_000),
      });

      const result = (await telegramResponse.json().catch(() => null)) as { ok?: boolean } | null;
      if (!telegramResponse.ok || !result?.ok) {
        throw new ApiError("Telegram не принял сообщение. Проверьте настройки бота.", 502);
      }

      return json({ ok: true });
    } catch (error) {
      if (error instanceof SyntaxError) {
        return json({ ok: false, message: "Некорректный формат запроса." }, 400);
      }

      const status = error instanceof ApiError ? error.status : 500;
      const message = error instanceof ApiError
        ? error.message
        : "Не удалось отправить заявку. Попробуйте позже.";
      return json({ ok: false, message }, status);
    }
  },
};

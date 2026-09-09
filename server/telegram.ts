export interface ProjectBriefPayload {
  name?: unknown;
  contact?: unknown;
  projectType?: unknown;
  message?: unknown;
  website?: unknown;
}

export interface TelegramCredentials {
  token?: string;
  chatId?: string;
}

export class ProjectBriefError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function sendProjectBrief(payload: ProjectBriefPayload, credentials: TelegramCredentials) {
  const website = text(payload.website, 200);
  if (website) return;

  const name = text(payload.name, 80);
  const contact = text(payload.contact, 160);
  const projectType = text(payload.projectType, 120) || "Не выбран";
  const message = text(payload.message, 2500);

  if (!name || !contact || !message) {
    throw new ProjectBriefError("Заполните имя, контакт и описание проекта.", 400);
  }

  if (!credentials.token || !credentials.chatId) {
    throw new ProjectBriefError("Форма временно недоступна: Telegram ещё не настроен.", 503);
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

  const telegramResponse = await fetch(`https://api.telegram.org/bot${credentials.token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: credentials.chatId,
      text: telegramMessage,
      link_preview_options: { is_disabled: true },
    }),
    signal: AbortSignal.timeout(8_000),
  });

  const result = (await telegramResponse.json().catch(() => null)) as { ok?: boolean } | null;
  if (!telegramResponse.ok || !result?.ok) {
    throw new ProjectBriefError("Telegram не принял сообщение. Проверьте настройки бота.", 502);
  }
}

import { ProjectBriefError, sendProjectBrief } from "../server/telegram";

export default async function handler(request: any, response: any) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ ok: false, message: "Метод не поддерживается." });
  }

  try {
    await sendProjectBrief(request.body ?? {}, {
      token: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID,
    });
    return response.status(200).json({ ok: true });
  } catch (error) {
    const status = error instanceof ProjectBriefError ? error.status : 500;
    const message = error instanceof ProjectBriefError ? error.message : "Не удалось отправить заявку. Попробуйте позже.";
    return response.status(status).json({ ok: false, message });
  }
}

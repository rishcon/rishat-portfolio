import { useEffect, useId, useRef, useState, type FormEvent } from "react";

interface ProjectBriefModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProjectBriefModal({ open, onClose }: ProjectBriefModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimeout = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input, select, textarea, [href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimeout);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMessage("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/project-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          contact: formData.get("contact"),
          projectType: formData.get("projectType"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message || "Не удалось отправить заявку.");

      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте позже.");
    }
  };

  return (
    <div
      className="brief-modal"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div ref={panelRef} className="brief-modal__panel" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="brief-modal__topline">
          <span>NEW PROJECT / BRIEF</span>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Закрыть окно">
            ЗАКРЫТЬ ×
          </button>
        </div>

        {status === "success" ? (
          <div className="brief-modal__success" role="status">
            <p className="brief-modal__eyebrow">ЗАЯВКА ОТПРАВЛЕНА</p>
            <h2 id={titleId}>СПАСИБО.</h2>
            <p>
              Бриф доставлен в Telegram. Я изучу задачу и свяжусь с вами по указанному контакту.
            </p>
            <button type="button" className="brief-modal__primary" onClick={onClose}>
              ПОНЯТНО
            </button>
          </div>
        ) : (
          <>
            <div className="brief-modal__heading">
              <p className="brief-modal__eyebrow">РАССКАЖИТЕ О ЗАДАЧЕ</p>
              <h2 id={titleId}>ОБСУДИМ<br />ПРОЕКТ.</h2>
              <p>Несколько вводных помогут понять масштаб и предложить подходящий формат работы.</p>
            </div>

            <form className="brief-form" onSubmit={handleSubmit}>
              <label className="brief-form__honeypot" aria-hidden="true">
                <span>Не заполняйте это поле</span>
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <label>
                <span>01 / КАК К ВАМ ОБРАЩАТЬСЯ</span>
                <input name="name" autoComplete="name" placeholder="Ваше имя" required />
              </label>
              <label>
                <span>02 / КАК С ВАМИ СВЯЗАТЬСЯ</span>
                <input name="contact" placeholder="Telegram, телефон или email" required />
              </label>
              <label>
                <span>03 / ЧТО НУЖНО СДЕЛАТЬ</span>
                <select name="projectType" defaultValue="">
                  <option value="" disabled>Выберите формат</option>
                  <option>Сайт или лендинг</option>
                  <option>Веб-приложение</option>
                  <option>Backend / API</option>
                  <option>AI / автоматизация</option>
                  <option>Нужно обсудить</option>
                </select>
              </label>
              <label>
                <span>04 / КОРОТКО О ПРОЕКТЕ</span>
                <textarea name="message" rows={4} placeholder="Задача, сроки, важные детали" required />
              </label>
              <div className="brief-form__footer">
                <p className={status === "error" ? "brief-form__message brief-form__message--error" : "brief-form__message"} role="status">
                  {status === "error" ? errorMessage : "Данные отправляются напрямую в Telegram и не сохраняются на сайте."}
                </p>
                <button type="submit" className="brief-modal__primary" disabled={status === "sending"}>
                  {status === "sending" ? "ОТПРАВЛЯЮ…" : "ОТПРАВИТЬ БРИФ ↗"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

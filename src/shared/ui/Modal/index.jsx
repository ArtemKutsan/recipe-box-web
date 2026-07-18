// src/shared/ui/Modal/index.jsx

/**
 * Универсальный компонент модального окна.
 *
 * Возможности:
 * - Рендерится через createPortal в document.body, чтобы находиться поверх всего приложения.
 * - Блокирует скролл страницы при открытии (overflow: hidden).
 * - Закрывается по:
 *    • клику по фону (backdrop)
 *    • кнопке закрытия
 *    • клавише Escape
 * - Имеет корректную доступность (ARIA): role="dialog", aria-modal, aria-labelledby.
 * - Использует useId() для уникального ID заголовка (нужно для screen readers).
 *
 * Пропсы:
 * - isOpen (boolean) — открыта ли модалка.
 * - title (string) — заголовок окна.
 * - children (ReactNode) — содержимое модалки.
 * - className (string) — дополнительные стили.
 * - overlayClassName (string) — дополнительные стили затемнённого слоя вокруг окна.
 * - onClose (function) — вызывается при любом действии закрытия.
 *
 * Важные детали реализации:
 * - useEffect:
 *     • при открытии модалки блокирует скролл страницы
 *     • добавляет обработчик Escape
 *     • при закрытии всё корректно очищает
 *
 * - onMouseDown на backdrop:
 *     • проверяет, что клик был именно по фону, а не по содержимому
 *     • предотвращает случайное закрытие при клике внутри окна
 *
 * - createPortal:
 *     • гарантирует, что модалка не зависит от вложенности компонентов
 *     • всегда отображается поверх интерфейса
 */

import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';

const Modal = ({ isOpen, title, children, className, overlayClassName, onClose }) => {
  // Генерируем уникальный ID для заголовка, используемый в aria-labelledby
  const titleId = useId();

  // Эффект для блокировки скролла и обработки Escape при открытии модалки
  useEffect(() => {
    // Пока модалка закрыта, эффект не создаёт подписки и не изменяет document.body
    if (!isOpen) return undefined;

    // Сохраняем текущее значение, чтобы не затереть стили страницы после закрытия
    const previousOverflow = document.body.style.overflow;

    // Один обработчик отвечает за закрытие модалки с клавиатуры
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Блокируем прокрутку страницы под модальным окном и подписываемся на Escape
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);

    // Cleanup выполняется при закрытии, размонтировании или изменении зависимостей
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  // Если модалка закрыта — не рендерим её вообще.
  // Это полностью убирает модалку из DOM, отключает backdrop, обработчики кликов и Escape.
  // Без этой проверки модалка бы висела в DOM даже в закрытом состоянии и перехватывала события.
  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-9999 flex items-center justify-center bg-foreground/50 p-4',
        overlayClassName,
      )}
      onMouseDown={(event) => {
        // target совпадает с currentTarget только при клике непосредственно по backdrop
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {/* aria-labelledby связывает диалог с заголовком через уникальный ID для screen readers */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-card',
          className,
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b p-4 bg-card">
          <h2 id={titleId} className="text-xl font-semibold">
            {title}
          </h2>
          {/* Кнопка закрытия модального окна */}
          {/* TODO: Заменить на иконку */}
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="Close modal"
          >
            &#215;
          </button>
        </header>

        <div className="overflow-y-auto p-4">{children}</div>
      </section>
    </div>,
    // Portal выносит модалку из DOM-иерархии приложения прямо в body
    document.body,
  );
};

export default Modal;

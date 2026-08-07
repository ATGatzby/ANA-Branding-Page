/**
 * main.js — vanilla JS behavior for the personal branding/portfolio page.
 * No dependencies, no build step. Hooks into the exact class/id names
 * defined in PLAN.md so it stays in sync with index.html and styles.css.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = navList ? Array.from(navList.querySelectorAll('.nav__link')) : [];

  /* ---------------------------------------------------------------------
   * 1. Mobile nav toggle
   * ------------------------------------------------------------------- */
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('nav__list--open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------------------------------------------------------------------
   * 2. Auto-close mobile menu when a nav link is clicked
   * ------------------------------------------------------------------- */
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navList.classList.contains('nav__list--open')) {
        navList.classList.remove('nav__list--open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ---------------------------------------------------------------------
   * 3. Smooth scroll for in-page anchor links, offset for sticky header
   *
   * We read the header's real rendered height (rather than hardcoding a
   * guess) so the offset stays correct if the header's height changes
   * (e.g. responsive font sizes, wrapping nav, future design tweaks).
   * ------------------------------------------------------------------- */
  const getHeaderOffset = () => (header ? header.offsetHeight : 0);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      // Prefer scrollIntoView for smooth behavior, but correct for the
      // sticky header by scrolling an extra offset upward afterward via
      // scroll-margin-top-equivalent math using window.scrollTo, which
      // lets us precisely account for the header's actual height.
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset() - 16;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });

  /* ---------------------------------------------------------------------
   * 4. Active-link highlighting via IntersectionObserver
   *
   * An IntersectionObserver is preferred over a scroll listener because
   * it doesn't run on every scroll event (no manual throttling needed)
   * and lets the browser batch layout/intersection work efficiently.
   * The rootMargin shrinks the effective viewport so a section is
   * flagged "active" once it crosses roughly the upper-middle of the
   * screen, rather than requiring it to be perfectly centered.
   * ------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main .section[id]');

  if (sections.length && navLinks.length) {
    const setActiveLink = (id) => {
      navLinks.forEach((link) => {
        const isMatch = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('nav__link--active', isMatch);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------------------------------------------------------------------
   * 5. Contact form -- progressive enhancement over FormSubmit
   *
   * The form's plain `action` attribute already works with no JS at all
   * (a normal POST to FormSubmit, which redirects back via `_next`). Here
   * we intercept the submit and POST to FormSubmit's `/ajax/` endpoint
   * instead, so a successful send shows an inline message without leaving
   * the page.
   * ------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const statusEl = contactForm.querySelector('.contact-form__status');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const ajaxAction = contactForm.dataset.ajaxAction;

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      statusEl.textContent = 'Sending…';
      statusEl.removeAttribute('data-state');
      submitBtn.disabled = true;

      fetch(ajaxAction, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      })
        .then((response) => {
          if (!response.ok) throw new Error('Request failed');
          return response.json();
        })
        .then(() => {
          statusEl.textContent = "Thanks — your message has been sent. We'll get back to you soon.";
          statusEl.setAttribute('data-state', 'success');
          contactForm.reset();
        })
        .catch(() => {
          statusEl.textContent = 'Something went wrong. Please try again, or email us directly.';
          statusEl.setAttribute('data-state', 'error');
        })
        .finally(() => {
          submitBtn.disabled = false;
        });
    });
  }
});

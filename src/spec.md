# Specification

## Summary
**Goal:** Update the Services pricing and related UI copy to show tiered INR pricing packages across the site.

**Planned changes:**
- Update `frontend/src/config/services.ts` so each service price string exactly matches the new INR package values (including the ₹ symbol and ranges where applicable).
- Change the Services page main heading from “Our Services” to “Our Pricing” in `frontend/src/pages/ServicesPage.tsx` and ensure service cards display the updated INR prices.
- Ensure all other UI surfaces that display service pricing (including `frontend/src/components/order/OrderForm.tsx` service dropdown and `frontend/src/pages/HomePage.tsx` service previews) show the updated INR price text while keeping existing service IDs and “Order Now” routing/prefill behavior intact.

**User-visible outcome:** Users see “Our Pricing” and the new tiered INR package prices consistently across the Services page, Home page service previews, and the Order form service selector, with ordering flows continuing to work as before.

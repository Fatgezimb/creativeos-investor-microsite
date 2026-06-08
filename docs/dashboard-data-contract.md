# Creative OS Hero Dashboard Data Contract

This document defines the illustrative dashboard used in the website hero and the companion Remotion composition.

## Status

- Data source: illustrative demo data
- Purpose: show the Creative OS workflow concept before live pilots produce real product analytics
- Caveat: values must not be presented as actual traction, revenue, or customer proof

## Analytical Question

How does one creative-client job move from sales through scheduling, production, review, delivery, billing, and follow-up inside one operating surface?

## Module Question

What job does each Creative OS product surface do for a creative service business, and which operating signal should the viewer notice first?

## Chart Choices

### KPI Cards

- Use for current stage status where exact lookup matters more than trend shape
- Examples: qualified pipeline, booked capacity, active productions, approval velocity, ready-to-invoice amount

### Progress Bars

- Use for simple within-stage completion or health cues
- Keep to three bars so the read stays directional, not overloaded

### Revenue Momentum Line

- Use as an illustrative ordered trend
- Keep the subtitle/copy clear that this is demo data until pilot revenue exists
- Do not add axes or exact tick labels in the tiny hero card because the goal is directional product storytelling, not financial proof

## Stage Data

| Stage | Primary KPI | Chart Meaning | Reader Takeaway |
| --- | ---: | --- | --- |
| Sell | $84.2k | Qualified pipeline | Creative OS can connect proposals, deposits, and follow-up |
| Schedule | 71% | Booked capacity | Scheduling becomes part of the same client record |
| Produce | 4 | Active productions | Production work is operational, not scattered |
| Review | 2.1d | Approval velocity | Feedback and approvals are measurable workflow moments |
| Deliver | $24.8k | Ready-to-invoice | Delivery, billing, and repeat business stay connected |

## Module Data

| Module | Primary KPI | Chart Meaning | Reader Takeaway |
| --- | ---: | --- | --- |
| Creative OS | 7-10 | Tools consolidated | The product replaces a scattered stack with one workflow surface |
| Overview | 18 | Open work | Owners can see client work across the studio at a glance |
| CRM | 42 | Qualified contacts | Contacts become operational records, not static names |
| Projects | 4 | Active projects | Production execution stays connected to clients and assets |
| Media Review | 2.1d | Approval velocity | Feedback and versioning become measurable workflow moments |
| Calendar | 71% | Booked capacity | Scheduling and reminders become part of delivery operations |
| Billing | $24.8k | Ready-to-invoice | Billing follows delivery milestones |
| Client Portal | 12 | Portal actions | Clients can approve, pay, and download in one controlled space |

## Motion Contract

- Stage changes should feel sequenced, not random
- Cards reveal in a short stagger
- Progress bars grow from left to right
- Line chart draws from left to right
- Motion uses `cubic-bezier(0.16, 1, 0.3, 1)` to mirror the Remotion composition easing
- Reduced-motion users receive a near-static version

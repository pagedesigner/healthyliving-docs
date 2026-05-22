---
sidebar_position: 4
---

# CRM Workflows

CRM workflows automate actions from events such as orders, payments, intake assignment, subscription changes, cart activity, and patient updates.

## Common Workflow Pattern

1. Choose a trigger.
2. Add optional trigger conditions.
3. Add wait, condition, email, SMS, webhook, payment, or status update steps.
4. Test with sample data.
5. Keep inactive while reviewing.
6. Activate only when ready.

## Intake Reminder Example

Use the `intake.pending` trigger when a specific intake is pending for a patient/order.

Recommended wait-condition flow:

1. Trigger: `intake.pending`
2. Wait: 5 minutes
3. Refresh latest payload from database
4. Condition: `intake.status equals PENDING`
5. If true, send reminder or run the configured action

The payload includes patient, order, subscription, form, and intake details.

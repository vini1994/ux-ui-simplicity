
/**
 * Utility functions for interacting with webhooks
 */

interface WebhookData {
  event: string;
  timestamp: string;
  data: any;
}

/**
 * Triggers a webhook with the specified payload
 * @param url - The webhook URL to call
 * @param event - The event name (e.g., "checkout.completed")
 * @param data - The data payload to send
 * @returns Promise resolving to the response
 */
export const triggerWebhook = async (url: string, event: string, data: any): Promise<Response> => {
  const webhookData: WebhookData = {
    event,
    timestamp: new Date().toISOString(),
    data
  };

  try {
    // Using no-cors mode to handle CORS restrictions
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // Add this to handle CORS
      body: JSON.stringify(webhookData),
    });
  } catch (error) {
    console.error("Error triggering webhook:", error);
    throw error;
  }
};

/**
 * Triggers all registered webhooks for a specific event
 * This simulates what would typically be done server-side
 * @param event - The event name to trigger
 * @param data - The data payload to send
 */
export const triggerAllWebhooks = async (event: string, data: any): Promise<void> => {
  // In a real application, this would be fetched from a database or API
  // For this example, we're simulating with localStorage
  const mockWebhooks = [
    {
      id: "wh-1",
      url: "https://exemple.com/webhooks/new-order",
      events: ["checkout.completed"],
      active: true,
    },
    {
      id: "wh-2",
      url: "https://exemple.com/webhooks/payment",
      events: ["payment.success", "payment.failed"],
      active: true,
    }
  ];

  // Filter webhooks that are active and listening for this event
  const relevantWebhooks = mockWebhooks.filter(
    webhook => webhook.active && webhook.events.includes(event)
  );

  // Trigger each webhook in parallel
  const promises = relevantWebhooks.map(webhook => 
    triggerWebhook(webhook.url, event, data)
      .catch(err => console.error(`Failed to trigger webhook ${webhook.id}:`, err))
  );

  await Promise.allSettled(promises);
};

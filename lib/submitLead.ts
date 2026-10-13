export type LeadData = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  businessUrl: string;
  message: string;
  websiteConfirm: string;
};

export async function submitLead(data: LeadData): Promise<void> {
  // Silently accept bot submissions so the honeypot does not reveal itself.
  if (data.websiteConfirm) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return;
  }

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim();

  if (!endpoint) {
    console.warn("Form is not connected to a backend. Leads are NOT being saved.");
    await new Promise((resolve) => setTimeout(resolve, 700));
    return;
  }

  const { websiteConfirm: _honeypot, ...lead } = data;
  void _honeypot;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Lead submission failed with status ${response.status}.`);
  }
}

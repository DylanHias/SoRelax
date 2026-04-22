import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  process.env.CF_PAGES_BRANCH ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Behandelingen",
        name: "treatments",
        path: "content/treatments",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          {
            type: "object",
            name: "treatments",
            label: "Lijst van behandelingen",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ?? "Nieuwe behandeling",
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID (slug — niet wijzigen)",
                description:
                  "Technische identificatie. Alleen aanpassen in overleg met de ontwikkelaar.",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Naam",
                required: true,
              },
              {
                type: "string",
                name: "category",
                label: "Categorie",
                required: true,
                options: [
                  { value: "therapeutic", label: "Therapeutisch" },
                  { value: "relaxation", label: "Ontspanning" },
                ],
              },
              {
                type: "string",
                name: "shortDescription",
                label: "Korte omschrijving",
                description: "Eén of twee zinnen, max. 200 tekens.",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "string",
                name: "longDescription",
                label: "Lange omschrijving",
                description: "Optioneel — getoond in de uitklapkaart.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "indications",
                label: "Goed voor",
                description: "Drie à vier korte tags (bv. ‘Nekpijn’).",
                list: true,
              },
              {
                type: "number",
                name: "priceAmount",
                label: "Prijs (€)",
                required: true,
              },
              {
                type: "string",
                name: "priceType",
                label: "Prijstype",
                required: true,
                options: [
                  { value: "fixed", label: "Vaste prijs" },
                  { value: "from", label: "Vanaf-prijs" },
                ],
              },
              {
                type: "string",
                name: "duration",
                label: "Duur",
                description: "Bv. ‘60 min’ of ‘45–60 min’.",
                required: true,
              },
              {
                type: "string",
                name: "salonizedLink",
                label: "Salonized-boekingslink",
                description:
                  "Directe Salonized-widget-URL voor deze behandeling, of ‘/afspraak’ voor de algemene pagina.",
                required: true,
              },
            ],
          },
        ],
      },
      {
        label: "Getuigenissen",
        name: "testimonials",
        path: "content/testimonials",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          {
            type: "object",
            name: "testimonials",
            label: "Lijst van getuigenissen",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.clientName ?? "Nieuwe getuigenis",
              }),
            },
            fields: [
              {
                type: "string",
                name: "id",
                label: "ID (slug — niet wijzigen)",
                required: true,
              },
              {
                type: "string",
                name: "clientName",
                label: "Naam klant",
                required: true,
              },
              {
                type: "string",
                name: "body",
                label: "Review",
                ui: { component: "textarea" },
                required: true,
              },
              {
                type: "boolean",
                name: "featured",
                label: "Tonen op homepagina?",
                description:
                  "Aangevinkt = verschijnt in de carrousel op de startpagina.",
              },
            ],
          },
        ],
      },
      {
        label: "Algemene instellingen",
        name: "settings",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
          filename: { readonly: true },
        },
        fields: [
          {
            type: "object",
            name: "openingHours",
            label: "Openingsuren",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.day
                  ? `${item.day} — ${item.hours ?? ""}`
                  : "Dag",
              }),
            },
            fields: [
              {
                type: "string",
                name: "day",
                label: "Dag",
                required: true,
              },
              {
                type: "string",
                name: "hours",
                label: "Uren",
                description: "Bv. ‘09:00 – 18:00’ of ‘Gesloten’.",
                required: true,
              },
            ],
          },
          {
            type: "string",
            name: "salonizedOpenWidgetUrl",
            label: "Salonized algemene boekingslink",
            description:
              "URL van de Salonized-boekingswidget. Wordt gebruikt voor de zwevende boekingsknop en de pagina ‘Afspraak’.",
          },
          {
            type: "string",
            name: "salonizedGiftcardUrl",
            label: "Salonized cadeaubonnen-link",
            description:
              "URL van de Salonized-cadeaubonwidget. Gebruikt op de pagina ‘Cadeaubon’.",
          },
          {
            type: "object",
            name: "socialLinks",
            label: "Social media",
            fields: [
              {
                type: "string",
                name: "instagram",
                label: "Instagram-URL",
              },
              {
                type: "string",
                name: "facebook",
                label: "Facebook-URL",
              },
            ],
          },
        ],
      },
    ],
  },
});

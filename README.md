# Australian TV Energy Explorer

A responsive three-view website for COS30045, built with HTML, CSS and JavaScript. It presents findings from Australian television energy-rating data prepared in KNIME.

## Live site

Current working preview: https://australian-tv-energy-explorer.excalor.chatgpt.site

After importing this repository into Vercel, replace the preview address above with your public Vercel submission URL.

## Required views

- **Home** introduces the topic and summarises the strongest findings.
- **Televisions** presents six core analytical questions, supplied charts, accessible written interpretations, an additional brand comparison and possible next investigations.
- **About Us** explains the project purpose, KNIME data-preparation process and GenAI use.

JavaScript controls view switching, URL hashes, current-page navigation feedback, mobile navigation, finding filters, the Question 1 chart switcher and chart enlargement dialog. The logo returns to Home.

## Project structure

```text
index.html
styles.css
script.js
assets/
├── power-logo.svg
└── q1–q8 chart images
```

## Run locally

Open `index.html` in a browser, or serve the project folder with the VS Code Live Server extension.

## Requirements checklist

- Three JavaScript-controlled views: Home, Televisions and About Us
- Clickable power logo returning to Home
- Hover and keyboard-focus feedback
- Visible active/current-page state
- Separate CSS and JavaScript files
- Colours aligned with the supplied power/energy theme
- Footer with year, student name and GenAI acknowledgement
- Australian appliance-energy content
- Responsive desktop, tablet and mobile layouts
- Alt text, keyboard navigation, focus states and accessible data summaries

## Data workflow

The original CSV contained 5,018 records and 32 columns. KNIME was used to select columns, sort records, remove duplicate models, filter available Australian televisions, standardise brand names, convert screen sizes to rounded inches, aggregate records and generate charts.

## GenAI use and reflection

Generative AI (ChatGPT/Codex) was used to:

- produce an initial semantic HTML structure;
- suggest CSS for the responsive layout, navigation states and accessible focus styling;
- help organise the KNIME findings into concise website copy;
- draft JavaScript for view switching, filters, chart switching and the modal chart preview; and
- check the site against the assignment requirements.

The supplied charts and analytical results came from the student’s KNIME workflow and coursework notes. The student reviewed the generated structure and is responsible for checking the final code, factual claims, accessibility, repository history and submitted deployment.

Using GenAI accelerated the first draft and made it easier to compare the implementation with the task requirements. The main limitation was that generated code still required manual checking: labels, data interpretations, file paths and interaction behaviour could not simply be assumed to be correct. The most useful approach was to give the AI the real assignment brief and source charts, then review the result section by section.

## Suggested GitHub commit history

1. `chore: initialise three-view website structure`
2. `feat: add responsive navigation and page switching`
3. `style: apply energy-themed responsive design`
4. `feat: add television findings and chart interactions`
5. `docs: add GenAI reflection and deployment notes`

## Deployment

Push the repository to GitHub and import it into Vercel. This package keeps `index.html` at the repository root, so it can be deployed as a plain static website with no build command. After deployment, paste the public URL into the **Live site** section above.

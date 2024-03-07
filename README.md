# Calendar

## Development Setup
This project uses Node.js to run ESLint and Prettier for maintaining code quality and consistency.

## Prerequisites
- Node.js (v12.x or later)
- npm (v6.x or later)
## Setting Up Your Development Environment
1. Install Dependencies:
Run npm install to install the project dependencies, including ESLint and Prettier.

## Contributing

Our project uses automated tools to ensure code quality and consistency:

- **Automated Linting and Formatting**: Our pre-commit hook, configured via `simple-git-hooks` and `lint-staged`, automatically lints and formats staged `.js` files according to our ESLint and Prettier configurations. This process runs automatically when you attempt to commit changes.

- **Manual Linting and Formatting**: If you wish to lint and format your code before staging (optional), you can run `npm run lint` and `npm run format`. This step is not required but can be useful for checking and fixing files across the entire project or for files not covered by the pre-commit hook.

Please ensure your changes pass these checks before pushing your commits. This automation helps maintain code quality and simplifies code reviews.

## Contributing
Please follow the coding conventions defined in .eslintrc.json and .prettierrc. Make sure your code passes ESLint checks and is formatted with Prettier before submitting a pull request.

# FullCalendar

Full-sized drag & drop calendar in JavaScript

- [Project Website](https://fullcalendar.io/)
- [Documentation](https://fullcalendar.io/docs)
- [Changelog](CHANGELOG.md)
- [Support](https://fullcalendar.io/support)
- [License](LICENSE.md)
- [Roadmap](https://fullcalendar.io/roadmap)

Connectors:

- [React](https://github.com/fullcalendar/fullcalendar-react)
- [Angular](https://github.com/fullcalendar/fullcalendar-angular)
- [Vue 3](https://github.com/fullcalendar/fullcalendar-vue) |
  [2](https://github.com/fullcalendar/fullcalendar-vue2)

## Bundle

The [FullCalendar Standard Bundle](bundle) is easier to install than individual plugins, though filesize will be larger. It works well with a CDN.

## Installation

Install the FullCalendar core package and any plugins you plan to use:

```sh
npm install @fullcalendar/core @fullcalendar/interaction @fullcalendar/daygrid
```

## Usage

Instantiate a Calendar with plugins and options:

```js
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

const calendarEl = document.getElementById('calendar')
const calendar = new Calendar(calendarEl, {
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: 'timeGridWeek',
  editable: true,
  events: [{ title: 'Meeting', start: new Date() }],
})

calendar.render()
```

## Development

You must install this repo with [PNPM](https://pnpm.io/):

```
pnpm install
```

Available scripts (via `pnpm run <script>`):

- `build` - build production-ready dist files
- `dev` - build & watch development dist files
- `test` - test headlessly
- `test:dev` - test interactively
- `lint`
- `clean`

[Info about contributing code &raquo;](CONTRIBUTING.md)

# Kanban Board

A lightweight, dark-themed Kanban board that runs entirely in the browser. Create task cards, drag them between **To Do**, **In progress** and **Done**, and pick up where you left off, because your board is saved automatically.

Built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

<!-- Add a screenshot or GIF of the board here, for example: -->
<!-- ![Kanban Board screenshot](screenshot.png) -->

**Live demo:** _add your GitHub Pages / Netlify link here_

## Features

- **Add tasks** through a pop-up form with a title and a description
- **Drag and drop** cards between columns using the HTML Drag and Drop API
- **Delete tasks** with a button on each card
- **Live counters** showing the number of cards in every column
- **Auto-save**: the board is stored in `localStorage` and restored on reload
- **Visual feedback**: the target column gets a dashed outline while you drag over it
- **Modern dark UI** built with Flexbox and CSS custom properties

## Tech Stack

| Layer | Technology |
| --- | --- |
| Structure | HTML5 |
| Styling | CSS3 (Flexbox, custom properties, transitions, `backdrop-filter`) |
| Logic | Vanilla JavaScript (ES6) |
| Storage | Web Storage API (`localStorage`) |

## Getting Started

No installation is needed.

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git

# 2. Go into the project folder
cd <your-repo>

# 3. Open index.html in your browser
```

You can also just double-click `index.html`. Any modern browser (Chrome, Edge, Firefox, Safari) works.

## Usage

1. Click **Add new Task** in the top-right corner.
2. Enter a title and description, then click **Add Task**. The card appears in **To Do**.
3. Drag a card and drop it on any column to change its status.
4. Click **Delete** on a card to remove it.
5. Click outside the form to close it without adding anything.
6. Refresh the page. Your cards and counts are still there.

To reset the board, clear the site's data in your browser, or run this in the developer console:

```js
localStorage.removeItem("tasks");
```

## Project Structure

```
.
├── index.html   # Page markup: navbar, three columns, add-task modal
├── style.css    # Theme variables, layout, cards, drag highlight, modal
└── script.js    # State, add / delete / drag-and-drop logic, persistence
```

## How It Works

The board keeps its information in three places, and the code keeps them in sync:

1. **The DOM**: the cards you see on screen. This is the source of truth.
2. **`tasksData`**: a plain JavaScript object rebuilt from the DOM by `updateTaskCount()` before every save.
3. **`localStorage`**: the same object stored as JSON under the key `tasks`.

Saved data looks like this. The keys match the column element ids:

```json
{
  "todo":     [{ "title": "Write report", "desc": "Chapter 3 draft" }],
  "progress": [{ "title": "Fix bug",      "desc": "Login page" }],
  "done":     [{ "title": "Setup repo",   "desc": "Git + folders" }]
}
```

### Key functions

| Function | Purpose |
| --- | --- |
| `addTask(title, desc, column)` | Creates a draggable card with a delete button and appends it to a column. Used for new tasks and for restoring saved ones. |
| `updateTaskCount()` | Refreshes each column's counter and rebuilds `tasksData` from the DOM. |
| `addDragEventsOnColumn(column)` | Makes a column a valid drop target and handles highlighting and dropping. |

### Drag and drop flow

`dragstart` on the card stores it in `draggedElement` → `dragenter` / `dragover` on a column allow the drop and add the `hover-over` class → `drop` moves the card, recounts and saves.

## Customization

| Want to change | Where |
| --- | --- |
| Colours, spacing, radii | CSS variables in `:root` at the top of `style.css` |
| Column names | The `.heading .left` text in `index.html` |
| Drag highlight animation | `.task-column` transition and `.hover-over` in `style.css` |
| Add a column | Add a new `div.task-column` with a unique id in `index.html`, include it in the `columns` array in `script.js`, and call `addDragEventsOnColumn()` on it. Counting, saving and restoring then work automatically. |

## Known Limitations

- Task text is inserted with `innerHTML`, so HTML typed into a title or description is rendered as markup. Switching to `textContent` would fix this.
- Empty titles are accepted.
- The form fields are not cleared after a task is added.
- Cards always drop at the end of a column and cannot be reordered within it.
- The HTML Drag and Drop API has limited support on touch screens.
- Data lives only in the current browser's `localStorage`; it is not synced between devices.

## Roadmap

- [ ] Input validation and safe text rendering
- [ ] Edit existing tasks
- [ ] Reorder cards within a column
- [ ] Touch and keyboard support
- [ ] Due dates, priorities and labels
- [ ] Export / import board as JSON

## Contributing

Contributions are welcome. Fork the repo, create a branch, make your changes and open a pull request.

## License

_Add a license of your choice (for example MIT) and link it here._

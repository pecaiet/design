import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Accordion, AccordionItem, Button, Card, Carousel, Combobox, DateInput, Datepicker, Dialog, Drawer, DropdownMenu, Link, MenuItem, MenuLabel, MenuSeparator, Modal, PlaceSelect, Popover, SearchWindow, Select, Stack, TabLinks, TabPanel, Tabs, TextInput, Tooltip, TreeView, useToast, Video, } from '../index';
import { Archive, CheckSquare, DotsThree, Folder, ListChecks, PencilSimple, Trash } from '@phosphor-icons/react';
import { useState } from 'react';
const COLOURS = [
    { value: 'red', label: 'Red', colour: 'red' },
    { value: 'green', label: 'Green', colour: 'green' },
    { value: 'blue', label: 'Blue', colour: 'blue' },
];
const LABELS = ['Home', 'Work', 'Errands', 'Health'].map(label => ({ value: label.toLowerCase(), label }));
export function Overlays() {
    const toast = useToast();
    const [modal, setModal] = useState(false);
    const [bare, setBare] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [search, setSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [colour, setColour] = useState('green');
    const [list, setList] = useState('work');
    const [labels, setLabels] = useState(['home']);
    const [day, setDay] = useState(new Date());
    const [due, setDue] = useState(null);
    const [range, setRange] = useState({ start: null, end: null });
    const [tab, setTab] = useState('open');
    const [view, setView] = useState('List');
    return (_jsxs(_Fragment, { children: [_jsx(Card, { title: "Tooltip, menu, popover", children: _jsxs(Stack, { row: true, children: [_jsx(Tooltip, { text: "Sort by date", side: "bottom", children: _jsx(Link, { onClick: () => { }, children: "Hover me" }) }), _jsxs(DropdownMenu, { trigger: _jsx(Button, { variant: "ghost", icon: _jsx(DotsThree, {}), label: "List actions" }), title: "Birthday present", children: [_jsx(MenuItem, { icon: _jsx(PencilSimple, {}), onClick: () => toast({ text: 'Rename' }), children: "Rename" }), _jsx(MenuItem, { icon: _jsx(Archive, {}), onClick: () => toast({ text: 'Archived', tone: 'success' }), children: "Archive" }), _jsx(MenuSeparator, {}), _jsx(MenuLabel, { children: "View" }), ['List', 'Board'].map(option => (_jsx(MenuItem, { checked: view === option, onClick: () => setView(option), children: option }, option))), _jsx(MenuSeparator, {}), _jsx(MenuItem, { destructive: true, icon: _jsx(Trash, {}), onClick: () => toast({ text: 'Deleted', tone: 'error' }), children: "Delete" })] }), _jsx(Popover, { trigger: _jsx(Button, { variant: "outline", children: "What\u2019s this?" }), title: "Shared lists", text: "Everyone you share a list with can add and tick tasks." })] }) }), _jsxs(Card, { title: "Modal, drawer, search window, toast", children: [_jsxs(Stack, { row: true, children: [_jsx(Button, { variant: "outline", onClick: () => setModal(true), children: "Open modal" }), _jsx(Button, { variant: "outline", onClick: () => setBare(true), children: "Open a dialog of your own" }), _jsx(Button, { variant: "outline", onClick: () => setDrawer(true), children: "Open drawer" }), _jsx(Button, { variant: "outline", onClick: () => setSearch(true), children: "Open search" }), _jsx(Button, { variant: "outline", onClick: () => toast({ text: 'Task added', tone: 'success', action: { label: 'Undo', onClick: () => { } } }), children: "Show a toast" })] }), _jsx(Modal, { open: modal, onClose: () => setModal(false), title: "Rename list", description: "Everyone it\u2019s shared with sees the new name.", actions: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: () => setModal(false), children: "Cancel" }), _jsx(Button, { variant: "primary", onClick: () => setModal(false), children: "Rename" })] }), children: _jsx(TextInput, { label: "Name", defaultValue: "Birthday present" }) }), _jsx(Dialog, { kind: "dialog", open: bare, onClose: () => setBare(false), "aria-labelledby": "design-shortcuts", children: _jsxs("div", { className: "pc-dialog-body", children: [_jsxs("div", { children: [_jsx("h2", { className: "pc-dialog-title", id: "design-shortcuts", children: "Keyboard shortcuts" }), _jsx("p", { className: "pc-dialog-description", children: "The Dialog under the Modal, for a window the Modal doesn\u2019t fit." })] }), _jsx("div", { className: "pc-dialog-actions", children: _jsx(Button, { variant: "primary", onClick: () => setBare(false), children: "Close" }) })] }) }), _jsx(Drawer, { open: drawer, onClose: () => setDrawer(false), title: "Task", footer: _jsx(Button, { variant: "primary", onClick: () => setDrawer(false), children: "Done" }), children: _jsx(TextInput, { label: "Title", defaultValue: "Buy a cake" }) }), _jsx(SearchWindow, { open: search, onClose: () => setSearch(false), query: query, onQueryChange: setQuery, placeholder: "Search tasks", groups: query
                            ? [
                                {
                                    label: 'Tasks',
                                    count: 2,
                                    results: [
                                        { id: '1', title: `${query} for Ana`, href: '/design' },
                                        { id: '2', title: `Plan ${query}`, href: '/design' },
                                    ],
                                },
                            ]
                            : [] })] }), _jsx(Card, { title: "Select, combobox", children: _jsxs(Stack, { children: [_jsx(Select, { label: "Colour", options: COLOURS, value: colour, onChange: setColour, none: "No colour" }), _jsx(Combobox, { label: "List", search: "Search lists", options: LABELS, value: list, onChange: setList }), _jsx(PlaceSelect, { label: "Go to list", current: "/design", places: [
                                { label: 'Inbox', href: '/design' },
                                { label: 'Work', href: '/design/app' },
                            ] }), _jsx(Combobox, { multiple: true, label: "Labels", search: "Search labels", placeholder: "Add a label", options: LABELS, value: labels, onChange: setLabels }), _jsx(Select, { label: "Priority", options: [{ value: 'high', label: 'High' }], value: null, onChange: () => { }, placeholder: "Pick one", error: "Pick a priority." })] }) }), _jsx(Card, { title: "Datepicker, date input", children: _jsxs(Stack, { gap: 4, children: [_jsx(Datepicker, { value: day, onChange: setDay }), _jsx(DateInput, { label: "Due", value: due, onChange: setDue, name: "due_on" }), _jsx(DateInput, { range: true, label: "Away", value: range, onChange: setRange, name: "away" })] }) }), _jsx(Card, { title: "Tabs, accordion, tree", children: _jsxs(Stack, { gap: 4, children: [_jsxs(Tabs, { label: "Tasks", value: tab, onChange: setTab, tabs: [
                                { value: 'open', label: 'Open', count: 3 },
                                { value: 'done', label: 'Done' },
                            ], children: [_jsx(TabPanel, { value: "open", children: "Three open tasks." }), _jsx(TabPanel, { value: "done", children: "Nothing done yet." })] }), _jsx(TabLinks, { label: "Settings", tabs: [
                                { href: '/design', label: 'Account', current: true },
                                { href: '/design', label: 'Sessions' },
                            ] }), _jsxs(Accordion, { children: [_jsx(AccordionItem, { summary: "Who can see my lists?", children: "Only the people you share them with." }), _jsx(AccordionItem, { summary: "Can I undo a delete?", children: "Tasks come back with Undo; lists don\u2019t." })] }), _jsx(TreeView, { label: "Lists", defaultExpanded: ['home'], items: [
                                {
                                    id: 'home',
                                    label: 'Home',
                                    icon: _jsx(Folder, {}),
                                    count: 3,
                                    children: [
                                        { id: 'groceries', label: 'Groceries', icon: _jsx(ListChecks, {}), count: 2 },
                                        { id: 'garden', label: 'Garden', icon: _jsx(CheckSquare, {}) },
                                    ],
                                },
                                { id: 'work', label: 'Work', icon: _jsx(Folder, {}), count: 1 },
                            ] })] }) }), _jsx(Card, { title: "Carousel, video", children: _jsxs(Stack, { gap: 4, children: [_jsx(Carousel, { label: "Apps", slides: [
                                { label: 'todo', content: _jsx("p", { children: "Lists and tasks." }) },
                                { label: 'pe caiet', content: _jsx("p", { children: "Notes." }) },
                            ] }), _jsx(Video, { title: "A tour of todo", duration: 125 })] }) })] }));
}

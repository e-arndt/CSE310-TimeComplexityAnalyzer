# Overview

As an aspiring software engineer, I wanted to improve my understanding of TypeScript by building a command-line application that demonstrates how different algorithms scale as dataset size increases. This project gave me practical experience working with TypeScript syntax, typed functions, arrays, recursion, modular file organization, asynchronous terminal input, and performance benchmarking.

The software is a Time Complexity Analyzer. It allows users to select an algorithm, dataset size, and dataset type from an interactive command-line menu. The selected benchmark is then executed and the execution time is displayed in the terminal. The program also stores and displays Top 5 benchmark results for each benchmark category.

The application currently demonstrates several common time complexities including:

- O(1) — Constant Time
- O(n) — Linear Time
- O(n log n) — Merge Sort
- O(n²) — Bubble Sort

The project also supports multiple dataset types, including:
- Random datasets
- Reverse-ordered datasets

My purpose for writing this software was to better TypeScript, how it supports JavaScript, how types are a benefit and how it can be used to organize larger projects into multiple files while also applying important software engineering concepts such as algorithm efficiency, modular architecture, reusable functions, clean terminal output, and persistent data storage.

[Software Demo Video](http://youtube.link.goes.here)

# How to Run the Program

## Prerequisites

Before running the project, install the following:

- Node.js
- npm

## Clone the Repository

```bash
git clone https://github.com/e-arndt/CSE310-TimeComplexityAnalyzer.git
```

## Open the Project Folder

```bash
cd CSE310-TimeComplexityAnalyzer
```

## Install Project Dependencies

```bash
npm install
```

## Start the Application

```bash
npm start
```

The application will launch an interactive command-line menu that allows users to:
- run benchmark tests
- select dataset sizes
- select dataset types
- view Top 5 benchmark results

# Development Environment

This software was developed using Visual Studio Code as the primary code editor. Git was used for version control, and GitHub was used to publish the public repository.

The project was built using:
- TypeScript
- Node.js
- npm
- ts-node

The software uses TypeScript features such as:
- typed function parameters
- interfaces
- arrays
- recursion
- asynchronous functions
- modular imports and exports
- exception handling
- reusable utility functions

# Useful Websites

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [npm Documentation](https://docs.npmjs.com/)
- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)

# Future Work

- Add additional algorithms such as Binary Search and Quick Sort.
- Add more dataset types such as nearly-sorted and duplicate-value datasets.
- Improve the benchmark result formatting and alignment.
- Add automated testing for algorithms and utility functions.
- Add charts or graphs to visually compare benchmark performance.
- Create a web-based user interface instead of using only a terminal interface.
- Allow exporting benchmark results to a file for comparison.
- Improve input validation and error handling for invalid user selections.
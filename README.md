# Matrix app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
 Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
 You will also see any lint errors in the console.

### Arguments

From the user, you expect to receive numbers M, N, and X.

M range from 0 to 100

N range from 0 to 100

Limits for X must be calculated based on M and N values (details below)

### Data

Create matrix M\*N, where M is the number of rows and N is the number of columns.

In each cell of the matrix should be an object with a structure

### As a user I should be able to see all data in the table view

- Show all generated data in the table with good UX.

- Each cell contains the previously generated amount

- Add an additional column to the table with values sum for each row

- Add an additional row to the table with the 50 percentile value for each column

### As a user I should be able to increase the value in the cell

Increate the amount in the cell by 1 when user press on it. Recalculate average and sum values.

### As a user I should be able to find the nearest by value cells

Highlight X cells where amount is closest to the amount of hovered cell.

### As a user I should be able to see the percent of each cell in a row

- When user hover on the sum cell in this row:

- Replace amount in each cell in the row with the percent from the total value in a row

- Build row heatmap. Add a background inside the each cell in a row which will represent the calculated percentage of the cell value from the maximum value in a row (not a percentage from a total).

### As a user I should be able to remove any row

Give the ability to remove any row in the table. Sum and average values should be recalculated respectively.

### As a user I should be able to add a row

A new row should be appended at the end of the table, sum and average values should be recalculated respectively.

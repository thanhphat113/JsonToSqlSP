
# MyLibrary

MyLibrary is a JavaScript library that helps you convert complex JSON objects into SQL stored procedures format. It's designed to work with various types of data, such as strings, numbers, arrays, and objects, and it flattens nested JSON objects for use in SQL queries.

## Installation

You can install jsontosqlsp via npm or use it directly via a CDN.

### 1. Install via npm:

```bash
npm install jsontosqlsp
```

Then, you can import and use it in your JavaScript project:

```javascript
import { downloadFormattedTxtFile } from 'jsontosqlsp';
```

### 2. Using via CDN:

You can also include it via CDN. Add the following `<script>` tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/thanhphat113/JsonToSqlSP/dist/json-to-sql-sp.umd.js"></script>
```

## Usage

### Convert JSON to SQL Stored Procedure

You can use the `jsonToSqlSP` function to convert a JSON object into SQL syntax suitable for a stored procedure.

```javascript
const sampleObject = {
    company: {
        name: "ABC Corp",
        location: {
            address: "123 Tech St, Silicon Valley",
            city: "San Francisco",
            state: "California",
            postalCode: "94105"
        },
        employees: [
            {
                id: 1,
                name: "Alice Smith",
                role: "Software Engineer"
            },
            {
                id: 2,
                name: "Bob Johnson",
                role: "Senior Developer"
            }
        ]
    }
};
console.log(sampleObject);
```

### Download SQL as Text File

You can use `downloadFormattedTxtFile` to generate and download the SQL stored procedure as a text file:

```javascript
JsonToSqlSP.downloadFormattedTxtFile("InsertCompanyData", sampleObject, "name: VARCHAR; city: VARCHAR", "company_data_proc");
```

## Features

- Converts complex, nested JSON objects into SQL stored procedure format.
- Handles different data types like strings, numbers, arrays, and objects.
- Supports generating and downloading SQL queries as text files.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Ly Thanh Phat

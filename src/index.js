const jsonToSqlSP = (item, parent = "", res = {}) => {
    for (let key in item) {
        if (key.startsWith("t_")) key = key.slice(2)
        const newKey = parent ? `${parent}_${key}` : key;
        if (Array.isArray(item[key])) {
            const result = resultListObjectOrString(item[key]);
            if (result) {
                res[newKey] = result;
            }
        } else if (typeof item[key] === "object" && item[key] !== null) {
            jsonToSqlSP(item[key], newKey, res);
        } else {
            res[newKey] = item[key];
        }
    }
    return res;
};

const resultListObjectOrString = (arr) => {
    return arr.every((item) => typeof item === "string") ? arr.filter(item => item !== "").join("_") : null;
};

export const downloadFormattedTxtFile = (
    name,
    data,
    dependencies = "",
    filename
) => {
    const objectDependencies = convertDependencies(dependencies);
    const json = jsonToSqlSP(data);
    const jsonKeys = Object.keys(json);
    let formattedData = `CREATE PROCEDURE [dbo].[${name}]\n`;

    if (objectDependencies) {
        const keys = Object.keys(objectDependencies);
        keys.forEach((key, index) => {
            formattedData +=
                index === keys.length - 1
                    ? `\t@${key} ${objectDependencies[key]}\n`
                    : `\t@${key} ${objectDependencies[key]},\n`;
        });
    }

    formattedData += `AS\nBEGIN\n\tSELECT\n`;
    jsonKeys.forEach((value,index) => {
        formattedData += `\t${hasDiacritics(json[value]) ? `N` : ""}${
            json[value] === "1" || json[value] === "0" ? `CAST(${json[value]} AS BIT)` : `'${json[value]}'`
        } ${value}${index !== jsonKeys.length -1 && ","}\n`;
    });

    formattedData += `END\n`;

    downloadTxtFile(formattedData, filename);

    return formattedData;
};

const hasDiacritics = (str) => {
    return /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹ]/.test(
        str
    );
};

const convertDependencies = (str) => {
    const dependencies = str.split(";").map((item) => item.trim());
    const result = dependencies.reduce((obj, item) => {
        const [key, value] = item.split(":");
        obj[key] = value;
        return obj;
    }, {});
    return result;
};

const downloadTxtFile = (data, filename) => {
    const blob = new Blob([data], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

export const readJsonFileToObject = (file) => {
    return new Promise((resolve, reject) => {
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    output.textContent = JSON.stringify(jsonData, null, 2);
                    resolve(jsonData);
                } catch (error) {
                    reject (`Error parsing JSON: ${error.message}`);
                }
            };

            reader.onerror = () => {
                reject (`Error reading file: ${reader.error}`);
            };

            reader.readAsText(file);
        } else {
            reject ("No file selected.");
        }
    });
};

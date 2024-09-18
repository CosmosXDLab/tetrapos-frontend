export class JsonToCsv {

    public static exec(jsonArray: Object[], fileName: string) {
        const csv = this.jsonToCsv(jsonArray);
        this.downloadCsv(`${fileName}.csv`, csv);
    }

    private static jsonToCsv(jsonArray: Object[]): string {
        if (jsonArray.length === 0) return '';
    
        // Obtener las cabeceras
        const headers = Object.keys(jsonArray[0]);
        const csvRows: string[] = [];
    
        // Agregar las cabeceras al CSV
        csvRows.push(headers.join(','));
    
        // Agregar las filas de datos
        for (const row of jsonArray) {
            const values = headers.map(header => {
                const value = (row as any)[header];
                // Escapar comillas y comas en valores
                const escapedValue = (typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value);
                return escapedValue;
            });
            csvRows.push(values.join(','));
        }
    
        return csvRows.join('\n');
    }

    private static downloadCsv(filename: string, csv: string) {
        const csvFile = new Blob([csv], { type: 'text/csv' });
        const downloadLink = document.createElement('a');
        
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = 'none';
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
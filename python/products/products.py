import os
import pandas as pd
import json
from datetime import datetime

def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    return data

def convert_csv_to_json(csv_filename, json_filename, categories_filename, suppliers_filename):
    # Get the current script's directory
    script_directory = os.path.dirname(os.path.realpath(__file__))

    # Construct the full path to the CSV file
    csv_path = os.path.join(script_directory, csv_filename)

    # Read CSV file into a DataFrame
    df = pd.read_csv(csv_path, encoding='utf-8')

    # Convert 'Fecha Ingreso' column to datetime
    df['Fecha Ingreso'] = pd.to_datetime(df['Fecha Ingreso'], errors='coerce')

    # Fill missing 'Fecha Ingreso' values with the previous row's value
    df['Fecha Ingreso'] = df['Fecha Ingreso'].fillna(method='ffill')

    # Load category and supplier data from JSON files
    categories_data = load_json(os.path.join(script_directory, categories_filename))
    suppliers_data = load_json(os.path.join(script_directory, suppliers_filename))

    # Create a dictionary to map category names to their corresponding ids
    category_id_map = {category['name'].lower(): category['id'] for category in categories_data}

    # Create a dictionary to map supplier names to their corresponding ids
    supplier_id_map = {supplier['name'].lower(): supplier['id'] for supplier in suppliers_data}

    # Default categoryId when no matching category is found
    default_category_id = 198

    # Default supplierId when no matching supplier is found
    default_supplier_id = 2060

    # Convert DataFrame to a list of dictionaries
    data_list = df.to_dict(orient='records')

    # Transform data for the desired JSON format
    transformed_data = []
    for record in data_list:
        if record['Estado'] != 'Disponible':
            continue

        # Get categoryId based on 'Tipo Articulo' (Category) name
        category_name = str(record['Tipo Articulo']).lower()
        category_id = category_id_map.get(category_name, default_category_id)

        # Get supplierId based on 'Proveedora' (Supplier) name
        supplier_name = str(record['Proveedora']).lower()
        supplier_id = supplier_id_map.get(supplier_name, default_supplier_id)

        transformed_record = {
            'name': str(record['Codigo Articulo']) + " - " + str(record['Descripción']) if not pd.isna(record['Codigo Articulo']) else None,
            'price': int(record['Importe Venta'].replace(" ", "").replace("$", "").replace(",", "")) * 100 if not pd.isna(record['Importe Venta']) else None,
            'size': record['Talle'] if not pd.isna(record['Talle']) else None,
            'businessProfitPercentage': 50,
            'businessProfit': int(record['Ganancia Ropero'].replace(" ", "").replace("$", "").replace(",", "")) * 100 if not pd.isna(record['Ganancia Ropero']) else None,
            'supplierProfit': int(record['Ganancia Proveedora'].replace(" ", "").replace("$", "").replace(",", "")) * 100 if not pd.isna(record['Ganancia Proveedora']) else None,
            'categoryId': category_id,
            'supplierId': supplier_id,
            'createdAt': record['Fecha Ingreso'].isoformat() if not pd.isna(record['Fecha Ingreso']) else None
        }

        # Only include fields with non-null values
        transformed_record = {k: v for k, v in transformed_record.items() if v is not None}

        transformed_data.append(transformed_record)

    # Construct the full path to the JSON file
    json_path = os.path.join(script_directory, json_filename)

    # Write the transformed data to a JSON file
    with open(json_path, 'w') as json_file:
        json.dump(transformed_data, json_file, indent=2)

if __name__ == "__main__":
    csv_filename = "products.csv"  # Replace with your CSV file's name
    json_filename = "products.json"  # Replace with your desired output file's name
    categories_filename = "elropero_Categories.json"  # Replace with your Categories JSON file's name
    suppliers_filename = "elropero_Suppliers.json"  # Replace with your Suppliers JSON file's name
    convert_csv_to_json(csv_filename, json_filename, categories_filename, suppliers_filename)

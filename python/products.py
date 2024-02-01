import os
import pandas as pd
import json
from datetime import datetime

def convert_csv_to_json(csv_filename, json_filename):
    # Get the current script's directory
    script_directory = os.path.dirname(os.path.realpath(__file__))

    # Construct the full path to the CSV file
    csv_path = os.path.join(script_directory, csv_filename)

    # Read CSV file into a DataFrame
    df = pd.read_csv(csv_path)

    # Convert 'Fecha Alta' column to datetime
    df['Fecha Ingreso'] = pd.to_datetime(df['Fecha Ingreso'], errors='coerce')

    # Fill missing 'Fecha Alta' values with the previous row's value
    df['Fecha Ingreso'] = df['Fecha Ingreso'].fillna(method='ffill')

    # Convert DataFrame to a list of dictionaries
    data_list = df.to_dict(orient='records')

    # Transform data for the desired JSON format
    transformed_data = []
    for record in data_list:
        if record['Estado'] != 'Disponible':
            continue

        transformed_record = {
            # 'id': record['DNI'],  # You can customize the id generation logic
            # 'name': record['Nombre y Apellido'],
            # 'dni': str(record['DNI']) if not pd.isna(record['DNI']) else None,
            # 'address': record['Dirección'] if not pd.isna(record['Dirección']) else None,
            # 'phone': str(record['Celular']) if not pd.isna(record['Celular']) else None,
            # 'email': record['email'] if not pd.isna(record['email']) else None,
            # 'name': record['Codigo Articulo'] if not pd.isna(record['Codigo Articulo']) else None,
            'name': str(record['Codigo Articulo']) + " - " + str(record['Descripción']) if not pd.isna(record['Codigo Articulo']) else None,
            'price': int(record['Importe Venta'].replace(" ", "").replace("$", "").replace(",", "")) * 100 if not pd.isna(record['Importe Venta']) else None,
            'size': record['Talle'] if not pd.isna(record['Talle']) else None,
            'businessProfitPercentage': 50,
            'businessProfit': int(record['Ganancia Ropero'].replace(" ", "").replace("$", "").replace(",", "")) * 100 if not pd.isna(record['Ganancia Ropero']) else None,
            'supplierProfit': int(record['Ganancia Proveedora'].replace(" ", "").replace("$", "").replace(",", "")) * 100 if not pd.isna(record['Ganancia Proveedora']) else None,
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
    json_filename = "products.json"       # Replace with your desired output file's name
    convert_csv_to_json(csv_filename, json_filename)

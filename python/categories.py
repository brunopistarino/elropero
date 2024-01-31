import os
import pandas as pd
import json

def convert_csv_to_json(csv_filename, json_filename):
    # Get the current script's directory
    script_directory = os.path.dirname(os.path.realpath(__file__))

    # Construct the full path to the CSV file
    csv_path = os.path.join(script_directory, csv_filename)

    # Read CSV file into a DataFrame
    df = pd.read_csv(csv_path)

    # Convert DataFrame to a list of dictionaries
    data_list = df.to_dict(orient='records')

    # Transform data for the desired JSON format
    transformed_data = []
    for record in data_list:
        transformed_record = {
            'name': str(record['Descripción']).capitalize().strip()
        }

        transformed_data.append(transformed_record)

    # Construct the full path to the JSON file
    json_path = os.path.join(script_directory, json_filename)

    # Write the transformed data to a JSON file
    with open(json_path, 'w') as json_file:
        json.dump(transformed_data, json_file, indent=2)

if __name__ == "__main__":
    csv_filename = "categories.csv"  # Replace with your CSV file's name
    json_filename = "categories.json"       # Replace with your desired output file's name
    convert_csv_to_json(csv_filename, json_filename)
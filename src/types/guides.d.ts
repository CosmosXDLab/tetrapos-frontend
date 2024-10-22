export interface Guide {
    id: string;
    document_type: number;
    serial_number: string;
    document_number: string;
    issue_date: string;
    currency: Currency;
    exchange_rate: string;
    customer: Customer;
    state: string;
    transfer_reason: TransferReason;
    total_gross_weight: string;
    measurement_unit: MeasurementUnit;
    quantity_packages: string;
    transportation_mode: number;
    transportation_start_date: string;
    carrier: Carrier;
    plate_number: string;
    destination_district: string;
    destination_province: string;
    destination_region: string;
    destination_ubigeo: string;
    destination_address: string;
    departure_district: string;
    departure_province: string;
    departure_region: string;
    departure_ubigeo: string;
    departure_address: string;
    reference_document: ReferenceDocument;
    observation: string;
    despatch_advice_lines: DespatchAdviceLine[]; //aquiii
  }
  
  interface Currency {
    id: string;
    code: string;
    name: string;
    description: string;
    value: string;
    kind: string;
  }
  
  interface Customer {
    id: string;
    identification_document_type: string;
    identification_document_number: string;
    business_name: string;
    first_names: string;
    last_names: string;
    birthday: string;
    district: string;
    province: string;
    region: string;
    address: string;
    phone_number: string;
    email: string;
  }
  
  interface TransferReason {
    id: string;
    code: string;
    name: string;
    description: string;
    value: string;
    kind: string;
  }
  
  interface MeasurementUnit {
    id: string;
    code: string;
    name: string;
    description: string;
  }
  
  interface Carrier {
    id: string;
    identification_document_type: string;
    identification_document_number: string;
    business_name: string;
    first_names: string;
    last_names: string;
    license_number: string;
  }
  
  interface ReferenceDocument {
    id: string;
    document_type: number;
    serial_number: string;
    document_number: string;
    issue_date: string;
    currency: Currency;
    exchange_rate: string;
    customer: Customer;
    state: string;
  }
  
  interface DespatchAdviceLine {
    id: string;
    code: string;
    description: string;
    measurement_unit: MeasurementUnit;
    quantity: string;
  }
  
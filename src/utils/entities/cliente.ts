export interface EntityCliente {
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

export interface NewEntityCliente extends Omit<EntityCliente, "id"> {}

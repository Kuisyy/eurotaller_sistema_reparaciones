import FormInput from './FormInput';

const ClientFields = ({ formData, onChange }) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <FormInput
        label="Teléfono"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Introduce el teléfono"
        required
      />
      <FormInput
        label="DNI/NIF"
        type="text"
        name="nif"
        value={formData.nif}
        onChange={onChange}
        placeholder="Introduce el DNI/NIF"
        required
      />
    </div>
  </>
);

export default ClientFields;
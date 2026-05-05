import Card from "../../ui/Card";
import FormField from "../../ui/FormField";

const ApiConfig = ({ cfg, onChange }) => {
  const field = (label, key, props = {}) => (
    <FormField label={label} required={props.required}>
      <input
        className="input"
        value={cfg[key]}
        onChange={(e) => onChange(key, e.target.value)}
        {...props}
      />
    </FormField>
  );

  return (
    <Card title="API Configuration">
      <div className="grid grid--3 mb-14">
        {field("Base URL", "baseUrl", { placeholder: "https://api-app-us.cognigy.ai", required: true })}
        {field("Project ID", "projectId", { placeholder: "24-char project ID", maxLength: 24, required: true })}
        {field("API Key", "apiKey", { type: "password", placeholder: "X-API-Key", required: true })}
      </div>
      <div className="grid grid--2">
        {field("Start Date", "startDate", { type: "datetime-local", required: true })}
        {field("End Date",   "endDate",   { type: "datetime-local", required: true })}
      </div>
    </Card>
  );
};

export default ApiConfig;

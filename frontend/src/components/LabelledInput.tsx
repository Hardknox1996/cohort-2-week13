
export interface LabelledInput {
  label: string, 
  placeholder: string,
  onChange: (e: any) => void;
  type: string
}

export const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInput) => {
  return (
    <div>
      <label
        className="block mb-2 text-sm  text-gray-900 font-semibold"
      >
        {label}
      </label>
      <input
        type={type}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder} required
        onChange={onChange}
      />
    </div>

  )
}

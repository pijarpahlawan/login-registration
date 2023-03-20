function InputForm(props) {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-base font-bold mb-2"
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:ring-1 focus:ring-blue-300 focus:shadow-md"
      />
    </div>
  );
}

export default InputForm;

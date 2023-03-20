import InputForm from './InputForm';

function FormAuth(props) {
  const inputForm = props.inputs.map((input) => (
    <InputForm
      key={input.id}
      htmlFor={input.htmlFor}
      label={input.label}
      name={input.name}
      type={input.type}
      placeholder={input.placeholder}
      value={input.value}
      onChange={input.onChange}
    />
  ));

  return (
    <div className="mx-4 my-4">
      <h2 className="text-xl font-bold mb-4 text-center">{props.tittleForm}</h2>
      <form
        className="bg-white shadow-md rounded-sm mb-8 px-4 py-6"
        action=""
        method="post"
        onSubmit={props.onSubmit}
      >
        {inputForm}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {props.buttonContent}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormAuth;

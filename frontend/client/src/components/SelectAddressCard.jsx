export function SelectAddressCard({
  firstName,
  lastName,
  address,
  city,
  district,
  state,
  PINcode,
  phoneno,
  selected,
  onSelect,
}) {
  return (
    <div>
      <div
        className={`border w-full px-5 pt-2 pb-2 rounded-md cursor-pointer ${
          selected ? "bg-green-400 " : "bg-stone-100"
        }`}
        onClick={onSelect}
      >
        <h1 className="text-lg font-medium pt-3">
          {firstName} {lastName}
        </h1>
        <p>{address}</p>
        <div className="flex">
          <p className="w-2/4">
            City: <span className="font-medium"> {city}</span>
          </p>
          <p className="w-2/4">
            District: <span className="font-medium"> {district}</span>
          </p>
        </div>
        <div className="flex">
          <p className="w-2/4">
            State: <span className="font-medium"> {state}</span>
          </p>
          <p className="w-2/4">
            Pin code: <span className="font-medium"> {PINcode}</span>
          </p>
        </div>
        <p>
          Phone no.: <span className="font-medium"> {phoneno}</span>
        </p>
        <hr className="border-t mt-2 border-stone-900" />
        <div className="flex justify-end mt-3">
          <div className="flex justify-end gap-4 ">
            <button className="border border-black px-3 py-1 bg-white rounded font-medium hover:ring-1 ring-black">
              Edit
            </button>
            <button className="border border-black px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

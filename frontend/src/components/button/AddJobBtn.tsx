import { useFormStore } from "../../store/useStore";

const AddJobBtn = () => {
  const { isSubmitting } = useFormStore();
  return (
    <div className="flex justify-center pt-6 border-t">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </div>
  );
};
export default AddJobBtn;

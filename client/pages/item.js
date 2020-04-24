// Component styled
import PageItem from "../components/PageItem";

// SEE INFORMATION TO PRODUCT
export default function item({ query }) {
  return (
    <div>
      <PageItem id={query.id} message={query.message} />
    </div>
  );
}

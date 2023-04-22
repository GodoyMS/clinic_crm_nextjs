import { useRouter } from 'next/router';

function DashboardSubpage() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Dashboard Subpage</h1>
      <p>Slug: {JSON.stringify(slug)}</p>
    </div>
  );
}

export default DashboardSubpage;
import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarberShopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarberShopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    //TODO: redirecionar para a home page
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    //TODO: redirecionar para a home page
    return null;
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <div className="flex flex-col gap-4 py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session}
            barbershop={barbershop}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbershopDetailsPage;

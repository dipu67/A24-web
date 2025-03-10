import { MainNav } from "@/components/MainNav";
import { AirdropCard } from "@/components/AirdropCard";
import { FundedProjectCard } from "@/components/FundedProjectCard";
import Link from "next/link";

const popularAirdrops = [
  {
    name: "Jupiter",
    logo: "/project-logos/jupiter.svg",
    description: "Jupiter is a key liquidity aggregator in the Solana ecosystem, providing the best swap rates through intelligent routing.",
    value: "5,000",
    endDate: "Mar 31, 2024",
    status: "Active",
    href: "/airdrops/jupiter"
  },
  {
    name: "LayerZero",
    logo: "/project-logos/layerzero.svg",
    description: "LayerZero is an omnichain interoperability protocol designed to enable message passing across chains.",
    value: "10,000",
    endDate: "Apr 15, 2024",
    status: "Upcoming",
    href: "/airdrops/layerzero"
  },
  {
    name: "Starknet",
    logo: "/project-logos/starknet.svg",
    description: "StarkNet is a permissionless decentralized ZK-Rollup operating as an L2 network over Ethereum.",
    value: "7,500",
    endDate: "Mar 25, 2024",
    status: "Active",
    href: "/airdrops/starknet"
  }
];

const recentAirdrops = [
  {
    name: "Pyth Network",
    logo: "/project-logos/pyth.svg",
    description: "Pyth Network is a next-generation oracle solution delivering real-time market data.",
    value: "3,000",
    endDate: "Apr 5, 2024",
    status: "Active",
    href: "/airdrops/pyth"
  },
  {
    name: "Celestia",
    logo: "/project-logos/celestia.svg",
    description: "Celestia is the first modular blockchain network that enables anyone to deploy their own blockchain.",
    value: "4,500",
    endDate: "Mar 28, 2024",
    status: "Active",
    href: "/airdrops/celestia"
  }
];

const fundedProjects = [
  {
    name: "Eigenlayer",
    logo: "/project-logos/eigenlayer.svg",
    description: "EigenLayer is a protocol that enables restaking of assets to secure additional networks and services.",
    raisedAmount: 50000000,
    investors: 15,
    category: "Infrastructure",
    href: "/projects/eigenlayer"
  },
  {
    name: "Dymension",
    logo: "/project-logos/dymension.svg",
    description: "Dymension is building a network of modular blockchains with RollApps technology.",
    raisedAmount: 25000000,
    investors: 12,
    category: "Layer 1",
    href: "/projects/dymension"
  },
  {
    name: "Fuel Labs",
    logo: "/project-logos/fuel.svg",
    description: "Fuel is the fastest modular execution layer, designed to scale Ethereum.",
    raisedAmount: 80000000,
    investors: 20,
    category: "Layer 2",
    href: "/projects/fuel"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <MainNav />
      <main className="container mx-auto py-6 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            A24 Crypto Airdrops
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted platform for discovering and tracking the most promising crypto airdrops.
          </p>
        </section>

        {/* Popular Airdrops */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Popular Airdrops</h2>
            <Link 
              href="/airdrops"
              className="text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularAirdrops.map((airdrop) => (
              <AirdropCard key={airdrop.name} {...airdrop} />
            ))}
          </div>
        </section>

        {/* Recent Airdrops */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Recent Airdrops</h2>
            <Link 
              href="/recent-airdrops"
              className="text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {recentAirdrops.map((airdrop) => (
              <AirdropCard key={airdrop.name} {...airdrop} />
            ))}
          </div>
        </section>

        {/* Recently Funded Projects */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight">Recently Funded Projects</h2>
            <Link 
              href="/funded-projects"
              className="text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fundedProjects.map((project) => (
              <FundedProjectCard key={project.name} {...project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

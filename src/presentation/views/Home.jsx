import React, { useEffect } from "react";
import { useCryptoContext } from "@/adapters/context/index.js";
import { CryptoCard } from "@/presentation/componentes/CryptoCard";
import { StatusBadge } from "@/presentation/componentes/StatusBadge";

export function Home() {
	const { listData, loading, error, fetchCryptoList, dataSource } =
		useCryptoContext();

	const viewWrapperStyles =
		"flex-1 flex flex-col w-full min-h-0 justify-start md:justify-center";
	const headerStyles =
		"mb-4 lg:mt-16 flex flex-col items-center md:items-start text-center md:text-left";
	const titleStyles =
		"text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-2";
	const subtitleStyles =
		"text-slate-500 dark:text-slate-400 font-medium tracking-wide";
	const gridStyles = "grid grid-cols-1 md:grid-cols-2 gap-8 w-full pb-20";

	useEffect(() => {
		fetchCryptoList();
	}, [fetchCryptoList]);

	if (loading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<span className="text-xl font-black tracking-widest opacity-10 animate-pulse">
					SYNCING DATA
				</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex-1 flex items-center justify-center px-4">
				<div className="p-6 rounded-3xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-center">
					{error}
				</div>
			</div>
		);
	}

	return (
		<main className={viewWrapperStyles}>
			<header className={headerStyles}>
				<StatusBadge source={dataSource} />
				<h2 className={titleStyles}>MARKET OVERVIEW</h2>
				<p className={subtitleStyles}>
					Real-time comparison between Bitcoin and Pi Network.
				</p>
			</header>

			<div className={gridStyles}>
				{listData.map((crypto) => (
					<CryptoCard
						key={crypto.uuid}
						name={crypto.name}
						symbol={crypto.symbol}
						price={crypto.price}
						change={crypto.change24h}
						iconUrl={crypto.iconUrl}
						rank={crypto.rank}
						description={crypto.description}
					/>
				))}
			</div>
		</main>
	);
}

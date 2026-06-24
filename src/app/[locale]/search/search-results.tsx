import { Suspense } from "react";
import { getRouteLocale } from "@/i18n/server";
import { getActiveCurrencyCode } from '@/lib/currency-server';
import { FacetFilters } from "@/components/commerce/facet-filters";
import { ProductGridSkeleton } from "@/components/shared/product-grid-skeleton";
import { ProductGrid } from "@/components/commerce/product-grid";
import { buildSearchInput, getCurrentPage } from "@/lib/search-helpers";
import { query } from "@/lib/vendure/api";
import { SearchProductsQuery } from "@/lib/vendure/queries";

interface SearchResultsProps {
    searchParams: Promise<{
        page?: string
    }>
}

export async function SearchResults({ searchParams }: SearchResultsProps) {
    const searchParamsResolved = await searchParams;
    const locale = await getRouteLocale();
    const currencyCode = await getActiveCurrencyCode();
    const page = getCurrentPage(searchParamsResolved);
    const take = 30;

    const rawProductDataPromise = query(SearchProductsQuery, {
        input: buildSearchInput({
            searchParams: { ...searchParamsResolved, page: '1' },
            take: 10000
        })
    }, { languageCode: locale, currencyCode });

    const productDataPromise = rawProductDataPromise.then((result) => {
        const items = result.data.search.items;
        const totalItems = items.length;
        const paginatedItems = items.slice((page - 1) * take, page * take);
        return {
            ...result,
            data: {
                ...result.data,
                search: {
                    ...result.data.search,
                    totalItems,
                    items: paginatedItems
                }
            }
        };
    });


    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
                <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
                    <FacetFilters productDataPromise={productDataPromise} />
                </Suspense>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
                <Suspense fallback={<ProductGridSkeleton limit={take} />}>
                    <ProductGrid productDataPromise={productDataPromise} currentPage={page} take={take} />
                </Suspense>
            </div>
        </div>
    )
}
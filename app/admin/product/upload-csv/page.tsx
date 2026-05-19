"use client";

import { useState } from "react";

export default function UploadCSVPage() {
    const [file, setFile] =
        useState<File | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState<any>(null);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select CSV file");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("file", file);

            const response = await fetch(
                "/api/products/bulk-upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            setResult(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">
                Bulk Product Upload
            </h1>

            <div className="mt-6 border rounded-xl p-6">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) =>
                        setFile(
                            e.target.files?.[0] || null
                        )
                    }
                />

                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
                    >
                        {loading ? "Uploading..." : "Upload CSV"}
                    </button>

                    <a
                        href="/api/products/sample-csv"
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer"
                    >
                        Download Sample CSV
                    </a>
                </div>
            </div>

            {result && (
                <div className="mt-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="border p-4 rounded-xl">
                            <h2 className="font-bold">
                                Total
                            </h2>

                            <p>{result.total}</p>
                        </div>

                        <div className="border p-4 rounded-xl">
                            <h2 className="font-bold">
                                Success
                            </h2>

                            <p>{result.successCount}</p>
                        </div>

                        <div className="border p-4 rounded-xl">
                            <h2 className="font-bold">
                                Failed
                            </h2>

                            <p>{result.failedCount}</p>
                        </div>
                    </div>

                    {result.failedRows?.length > 0 && (
                        <div className="mt-8">
                            <h2 className="text-xl font-bold">
                                Failed Rows
                            </h2>

                            <div className="mt-4 space-y-3">
                                {result.failedRows.map(
                                    (
                                        item: any,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="border p-4 rounded-lg"
                                        >
                                            <p>
                                                SKU: {item.sku}
                                            </p>

                                            <p>
                                                Error: {item.error}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
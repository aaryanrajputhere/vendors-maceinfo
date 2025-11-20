import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

export interface Vendor {
  id?: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendors() {
      try {
        const res = await api.get("/vendors");
        console.log("API Response:", res.data);

        const rawData = Array.isArray(res.data)
          ? res.data
          : res.data?.vendors || res.data?.data || [];

        console.log("Raw vendor data sample:", rawData[0]);
        console.log(
          "All keys in first vendor:",
          rawData[0] ? Object.keys(rawData[0]) : "No vendors"
        );

        // Normalize vendor data - ensure each has an id field
        const vendorsData = rawData.map((vendor: any) => {
          const normalizedId =
            vendor.id || vendor._id || vendor.vendorId || vendor.vendor_id;
          console.log("Vendor normalization:", {
            original: vendor,
            normalizedId,
          });
          return {
            ...vendor,
            id: normalizedId,
          };
        });

        console.log("Processed vendors:", vendorsData);
        setVendors(vendorsData);
      } catch (err) {
        console.error("Error fetching vendors", err);
        setVendors([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVendors();
  }, []);

  return { vendors, loading, setVendors };
}

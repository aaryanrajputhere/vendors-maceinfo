import { useState } from "react";
import { api } from "../../lib/axios";
import type { Vendor } from "./useVendors";

export function useAddVendor() {
  const [loading, setLoading] = useState(false);

  async function addVendor(data: Vendor) {
    try {
      setLoading(true);
      const res = await api.post("/vendors", data);
      console.log("Create vendor response:", res.data);

      const vendorData = res.data?.vendor || res.data?.data || res.data || null;

      return vendorData;
    } catch (err) {
      console.error("Error creating vendor:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { addVendor, loading };
}

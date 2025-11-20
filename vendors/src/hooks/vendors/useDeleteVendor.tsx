import { useState } from "react";
import { api } from "../../lib/axios";

export function useDeleteVendor() {
  const [loading, setLoading] = useState(false);

  async function deleteVendor(vendorName: string) {
    try {
      setLoading(true);
      const res = await api.delete(`/vendors/${vendorName}`);
      console.log("Delete vendor response:", res.data);

      return true;
    } catch (err) {
      console.error("Error deleting vendor:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { deleteVendor, loading };
}

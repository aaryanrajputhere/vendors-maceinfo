import { api } from "../../lib/axios";
import type { Material } from "../../types/material";

export function useAddMaterial() {
  const addMaterial = async (material: Material) => {
    // Transform Google Drive URL from /view format to /thumbnail format
    let transformedMaterial = { ...material };

    if (material.image) {
      const driveViewPattern =
        /https:\/\/drive\.google\.com\/file\/d\/([^\/]+)\/view/;
      const match = material.image.match(driveViewPattern);

      if (match) {
        const fileId = match[1];
        transformedMaterial.image = `https://drive.google.com/thumbnail?id=${fileId}`;
      }
    }

    const res = await api.post("/materials", transformedMaterial);
    return res.data;
  };

  return { addMaterial };
}

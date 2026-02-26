// handles CSV export functionality

export function exportAddressesToCSV(points: any[]) {
    if (!points || points.length === 0) {
      alert("There are no points to export!");
      return;
    }
  
    const headers = ["Address", "Latitude", "Longitude"];
  
    // wrap each value in quotes, escape existing quotes
    const escape = (val: any) =>
      `"${String(val ?? "").replace(/"/g, '""')}"`;
  
    const rows = points.map(p => [
      escape(p.address),
      escape(p.lat),
      escape(p.lng)
    ]);
  
    const csv = [headers.map(escape), ...rows]
      .map(r => r.join(","))
      .join("\n");
  
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pinned_address_locations.csv";
    link.click();
    URL.revokeObjectURL(url);
  }
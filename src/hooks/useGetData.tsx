"use client";
import { timeTablesDataAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export default function useGetData() {
  const [data, setData] = useAtom(timeTablesDataAtom);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/db", { cache: "force-cache" })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setData(result);
      });
  }, []);

  return { data, loading };
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAP_SRC = "/SPAIN.jpg";

type Plant = {
  id: string;
  name: string;
  place: string;
  x: number;
  y: number;
  image: string;
  description: string;
};

const PLANTS: Plant[] = [
  {
    id: "jaen-olivo",
    name: "Olivo",
    place: "Jaén",
    x: 346,
    y: 322,
    image: "/olivo.jpg",
    description: "Árbol mediterráneo clave para el aceite; hojas perennes y fruto en drupa.",
  },
  {
    id: "caceres-encina",
    name: "Encina",
    place: "Cáceres",
    x: 260,
    y: 212,
    image: "/encina.jpg",
    description: "Quercus ilex; dominante en dehesas, muy resistente a sequía.",
  },
  {
    id: "murcia-romero",
    name: "Romero",
    place: "Murcia",
    x: 460,
    y: 316,
    image: "/romero.jpg",
    description: "Matorral aromático del Mediterráneo; flores azuladas, muy melífera.",
  },
  {
    id: "toledo-tomillo",
    name: "Tomillo",
    place: "Toledo",
    x: 346,
    y: 244,
    image: "/tomillo.jpg",
    description: "Thymus spp.; pequeño y aromático, típico de laderas y suelos pobres.",
  },
  {
    id: "valladolid-amapola",
    name: "Amapola",
    place: "Valladolid",
    x: 310,
    y: 146,
    image: "/amapola.jpg",
    description: "Papaver rhoeas; herbácea anual de campos de cereal, flor roja llamativa.",
  },
  {
    id: "guadalajara-lavanda",
    name: "Lavanda",
    place: "Guadalajara",
    x: 392,
    y: 182,
    image: "/lavanda.jpg",
    description: "Lavandula; muy aromática, usada en esencias y atractiva para polinizadores.",
  },
];

export default function Page() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [w, setW] = useState<number>(0);
  const [h, setH] = useState<number>(0);
  const [nat, setNat] = useState<{ W: number; H: number } | null>(null);

  const [active, setActive] = useState<Plant | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.onload = () => setNat({ W: img.naturalWidth, H: img.naturalHeight });
    img.src = MAP_SRC;
  }, []);

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      if (!nat) return;
      const aspect = nat.H / nat.W;
      setW(r.width);
      setH(r.width * aspect);
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [nat]);

  const scale = useMemo(() => {
    if (!nat || !w) return 1;
    return w / nat.W;
  }, [nat, w]);

  function flyTo(px: number, py: number, desiredZoom = 2.4) {
    if (!w || !h || !nat) return;
    const sx = px * scale;
    const sy = py * scale;
    const cx = w / 2;
    const cy = h / 2;
    setZoom(desiredZoom);
    setOffset({ x: cx - sx * desiredZoom, y: cy - sy * desiredZoom });
  }

  function reset() {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
    setActive(null);
  }

  function nextPlant() {
    if (!active) return;
    const idx = PLANTS.findIndex((p) => p.id === active.id);
    const next = PLANTS[(idx + 1) % PLANTS.length];
    setActive(next);
    flyTo(next.x, next.y, 2.6);
  }

  function prevPlant() {
    if (!active) return;
    const idx = PLANTS.findIndex((p) => p.id === active.id);
    const prev = PLANTS[(idx - 1 + PLANTS.length) % PLANTS.length];
    setActive(prev);
    flyTo(prev.x, prev.y, 2.6);
  }

  return (
    <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", padding: 16, color: "#000" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#000" }}>Plantas comunes — España</h1>
      </header>

      <div ref={wrapRef} style={{ width: "100%" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: h || 480,
            overflow: "hidden",
            borderRadius: 16,
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <motion.div
            animate={{ x: offset.x, y: offset.y, scale: zoom }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            style={{
              position: "absolute",
              inset: 0,
              width: w || "100%",
              height: h || "100%",
              transformOrigin: "0 0",
            }}
          >
            <img
              src={MAP_SRC}
              alt="Mapa de España"
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "contain", userSelect: "none", pointerEvents: "none" }}
            />

            {nat &&
              PLANTS.map((p) => {
                const left = p.x * scale - 28;
                const top = p.y * scale - 28;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActive(p);
                      flyTo(p.x, p.y, 2.6);
                    }}
                    style={{
                      position: "absolute",
                      left,
                      top,
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "3px solid #fff",
                      overflow: "hidden",
                      boxShadow: "0 8px 20px rgba(0,0,0,.25)",
                      cursor: "pointer",
                      background: "transparent",
                      padding: 0,
                    }}
                    title={`${p.name} — ${p.place}`}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </button>
                );
              })}
          </motion.div>

          {(zoom > 1 || active) && (
            <button
              onClick={reset}
              aria-label="Volver"
              style={{
                position: "absolute",
                left: 12,
                bottom: 12,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid #ddd",
                background: "#fff",
                color: "#000",
                boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ← Atrás
            </button>
          )}

          {/* Flechas de navegación en el mapa cuando hay planta activa */}
          {active && (
            <>
              <button
                onClick={prevPlant}
                aria-label="Planta anterior"
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#000",
                  boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                  cursor: "pointer",
                  fontSize: 18,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ←
              </button>
              <button
                onClick={nextPlant}
                aria-label="Siguiente planta"
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#000",
                  boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                  cursor: "pointer",
                  fontSize: 18,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                →
              </button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={reset}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,.35)",
              display: "grid",
              placeItems: "center",
              padding: 16,
              zIndex: 50,
              color: "#000",
            }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
              style={{
                width: "min(720px, 92vw)",
                background: "#fff",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,.25)",
                color: "#000",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 16, alignItems: "center" }}>
                {/* Imagen circular dentro del modal */}
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    overflow: "hidden",
                    margin: "auto",
                    boxShadow: "0 8px 20px rgba(0,0,0,.2)",
                  }}
                >
                  <img
                    src={active.image}
                    alt={active.name}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#000" }}>{active.name}</h3>
                  <p style={{ margin: "6px 0 12px", color: "#222", fontWeight: 600 }}>{active.place}</p>
                  <p style={{ marginBottom: 16, lineHeight: 1.5, color: "#333" }}>{active.description}</p>

                  {/* Flechas izquierda/derecha en el modal */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={prevPlant}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        background: "#fff",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    >
                      ←
                    </button>
                    <button
                      onClick={nextPlant}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        background: "#fff",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    >
                      →
                    </button>
                    <button
                      onClick={reset}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        background: "#f7f7f7",
                        color: "#000",
                        cursor: "pointer",
                        marginLeft: "auto",
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
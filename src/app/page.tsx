"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAP_SRC = "/SPAIN.jpg";

type Plant = {
  id: string;
  name: string;
  scientificName: string;
  place: string;
  x: number;
  y: number;
  image: string;
  description: string;
  uses: string;
  origin: string;
  isAutochthonous: boolean;
  extraInfo: string;
};

const PLANTS: Plant[] = [
  {
    id: "baleares-lirio-mar",
    name: "Lirio de mar",
    scientificName: "Pancratium maritimum",
    place: "Islas Baleares",
    x: 629,
    y: 224,
    image: "/lirio-mar.jpg",
    description: "Planta legalmente protegida presente en el Catálogo Balear de Especies Vegetales Amenazadas.",
    uses: "Uso medicinal: los bulbos contienen ungeremina, que puede ser adecuado como tratamiento para la enfermedad de Alzheimer. También tiene propósito decorativo u ornamental.",
    origin: "Islas baleares predominantemente, pero también en lugares de la península con dunas y arenales costeros",
    isAutochthonous: true,
    extraInfo: "De la flora silvestre litoral, es una de las especies de mayor vistosidad en su floración. Con frecuencia se observa sobre sus hojas el gusano de la mariposa Brithys pancratii."
  },
  {
    id: "cadiz-viborera",
    name: "Viborera de Cádiz",
    scientificName: "Echium gaditanum",
    place: "Cádiz",
    x: 265,
    y: 394,
    image: "/viborera-cadiz.jpg",
    description: "Planta endémica del sur de España, es decir, solo se encuentra en esta zona del mundo de forma natural.",
    uses: "Se emplea en jardinería y restauración ecológica por su gran resistencia a la salinidad, la sequía y los suelos pobres. Contiene alcaloides pirrolizidínicos, por lo que no es apta para el consumo humano.",
    origin: "Regiones del suroeste de Cádiz y el norte de Málaga",
    isAutochthonous: true,
    extraInfo: "Sus flores son ricas en néctar, por lo que es una fuente de alimento vital para insectos como las abejas, contribuyendo a la producción de miel local."
  },
  {
    id: "andalucia-hibisco",
    name: "Hibisco",
    scientificName: "Hibiscus rosa-sinensis",
    place: "Andalucía",
    x: 269,
    y: 359,
    image: "/hibisco.jpg",
    description: "Aunque no formen parte de la Andalucía tradicional hoy en día es una flor presente en cualquier patio andaluz o paisaje popular.",
    uses: "Tiene usos ornamentales como planta de jardín. Sus flores son comestibles y se pueden usar en ensaladas, guisos o postres. Tradicionalmente se le atribuyen propiedades medicinales para la tos, el dolor de garganta y como diurético.",
    origin: "Es originario de Asia oriental, específicamente de China. Actualmente se encuentra en climas cálidos y templados en todo el mundo.",
    isAutochthonous: false,
    extraInfo: "El clima allí es perfecto para esta flora por lo que se belleza y su color resalta más que en otras zonas convirtiéndose en marca de esta provincia."
  },
  {
    id: "toledo-flor-jara",
    name: "Flor de la Jara",
    scientificName: "Cistus ladanifer L.",
    place: "Toledo",
    x: 339,
    y: 243,
    image: "/flor-jara.jpg",
    description: "Arbusto de uno a dos metros de altura, con hojas verdes muy pegajosas por la resina y flores grandes, blancas y con manchas oscuras en la base de los pétalos.",
    uses: "Entre sus utilizaciones destaca la obtención de ládano, una resina aromática empleada en perfumería y en remedios tradicionales contra la tos. También se ha aprovechado su madera dura para utensilios y como leña.",
    origin: "La flor de la jara o jara pringosa es un arbusto característico del Mediterráneo occidental y especialmente abundante en la península ibérica, donde forma parte del paisaje de los Montes de Toledo.",
    isAutochthonous: true,
    extraInfo: "Su floración, que se da sobre todo en primavera, es muy llamativa y efímera, ya que cada flor dura un solo día, pero el arbusto florece durante varias semanas."
  },
  {
    id: "asturias-helecho",
    name: "Helecho",
    scientificName: "Pteridium aquilinum",
    place: "Asturias",
    x: 299,
    y: 37,
    image: "/helecho.jpg",
    description: "Autóctona (a veces considerada invasora al ser tan expansiva)",
    uses: "No se recomienda su utilización medicinal porque entre sus componentes químicos abundan las sustancias oncogénicas (como el Ptaquilósido). Aún así, popularmente se ha utilizado como diurético o para regular la menstruación.",
    origin: "Originario de Europa, Asia Oriental y América del norte pero ahora está distribuido por todos los continentes salvo la Antártida.",
    isAutochthonous: true,
    extraInfo: "En ganado como vacas o caballos el consumo habitual de helecho puede provocar enfermedades fatales."
  },
  {
    id: "galicia-hiedra",
    name: "Hiedra",
    scientificName: "Hedera helix",
    place: "Galicia",
    x: 186,
    y: 52,
    image: "/hiedra.png",
    description: "Es una planta trepadora perenne y autóctona de Europa, común en bosques húmedos y zonas sombrías.",
    uses: "Útil para cubrir muros, paredes y elementos que deseemos ocultar a la vista o para hacer una pantalla verde fresca. También se utiliza como follaje para arreglos florales.",
    origin: "Nativa de Europa, Asia y norte de África",
    isAutochthonous: true,
    extraInfo: "Tiene hojas lobuladas en tallos jóvenes, flores pequeñas en otoño y bayas tóxicas. Su savia puede causar irritación en la piel y su ingestión es peligrosa para humanos."
  },
  {
    id: "madrid-castano-indias",
    name: "Castaño de indias",
    scientificName: "Aesculus hippocastanum",
    place: "Madrid",
    x: 350,
    y: 196,
    image: "/castano-indias.png",
    description: "No es autóctona (fue introducida en España en el siglo XVI como árbol ornamental). No es invasora tampoco.",
    uses: "Se utiliza principalmente para problemas de circulación (varices, flebitis, hemorroides) y retención de líquidos. También se emplea externamente en lavados, pomadas, conjuntivitis o dolores reumáticos.",
    origin: "Originario de Europa Oriental (Balcanes y Cáucaso).",
    isAutochthonous: false,
    extraInfo: "Sus frutos (pilongas) no son comestibles, pero se usan en medicina tradicional para mejorar la circulación, tratar edemas y hematomas. Además, sus semillas tostadas se han utilizado como sustituto del café y su madera es ligera y blanda, útil para fabricar cajas."
  },
  {
    id: "leon-lupulo",
    name: "Lúpulo",
    scientificName: "Humulus lupulus",
    place: "León",
    x: 282,
    y: 97,
    image: "/lupulo.png",
    description: "Empezó siendo utilizado para la creación de la cerveza en Europa en el siglo XIII, se utilizaba también en infusiones.",
    uses: "El lúpulo sirve como relajante al contener propiedades sedantes, también para combatir el insomnio, reducir la actividad motora y el nerviosismo. Además, puede ser utilizado para aumentar el apetito y para acabar con las indigestiones nerviosas. Sus flores reducen los síntomas de la perimenopausia.",
    origin: "Europa y parte de Asia occidental",
    isAutochthonous: true,
    extraInfo: "Se ha demostrado que el lúpulo puede inhibir la producción de óxido nítrico, que es una de las sustancias que intervienen en la respuesta inflamatoria. Por esto ayuda en inflamaciones articulares y neurológicas."
  },
  {
    id: "pontevedra-eucalipto",
    name: "Eucalipto",
    scientificName: "Eucalyptus globulus",
    place: "Pontevedra",
    x: 150,
    y: 105,
    image: "/eucalipto.jpg",
    description: "Esta especie llegó a España a mediados del siglo XIX para su uso en la producción de madera y pasta de celulosa.",
    uses: "El eucalipto tiene muchos beneficios para la salud y funciona como un desinfectante natural. Se suelen usar sus infusiones o vapores para aliviar resfriados, y en aromaterapia ayuda a despejar la mente, además de ser antiviral y expectorante.",
    origin: "Es natural de Australia. En España está la mayor superficie de Eucaliptos de Europa.",
    isAutochthonous: false,
    extraInfo: "No fue hasta la década de 1940 cuando su cultivo se generalizó, impulsado por las políticas forestales de la época, que favorecían la obtención de materias primas por encima de la recuperación de la vegetación original."
  },
  {
    id: "canarias-bejeque",
    name: "Bejeque",
    scientificName: "Aeonium canariense",
    place: "Canarias",
    x: 130,
    y: 484,
    image: "/bejeque.jpg",
    description: "Estas hojas tan especiales con forma de roseta del bejeque se mantienen sin marchitar mucho tiempo, incluso después de haber sido arrancadas.",
    uses: "El bejeque se ha utilizado en la medicina popular por sus varios beneficios. Se utiliza como cicatrizante ya que ayuda a cerrar las heridas y regenerar tejidos. Alivia quemaduras, irritaciones y picaduras de insectos. Se usa también como hidratante para la piel seca.",
    origin: "Esta especie es un endemismo exclusivo de las Islas Canarias",
    isAutochthonous: true,
    extraInfo: "Se dice que una casa tradicional canaria no puede llegar a serlo completamente si no tiene un bejeque en su tejado."
  },
  {
    id: "valladolid-escoba",
    name: "Escoba",
    scientificName: "Cytisus scoparius",
    place: "Valladolid",
    x: 300,
    y: 138,
    image: "/escoba.jpg",
    description: "Su nombre proviene por su popularidad en Francia por su fabricación de escobas, y también se usó para curtir, hacer cuerdas, y como reemplazo del techo de paja entre otros.",
    uses: "La escoba se empezó a usar en medicina por la propiedad diurética de sus flores que por su riqueza en flavonoides se usan para tratar acumulaciones de líquido en tejidos como los edemas y obstrucciones en el bazo e hígado. Sin embargo su aplicación principal es para la obtención de esparteína, un antiarrítmico y cardiotónico usado por su acción indirecta sobre el corazón.",
    origin: "Generalizada en toda la península ibérica y también común en Europa atlántica",
    isAutochthonous: true,
    extraInfo: "Autóctona en la península, pero considerada especie exótica invasora en las Islas Canarias."
  },
  {
    id: "valencia-naranjo-dulce",
    name: "Naranjo dulce",
    scientificName: "Citrus sinensis",
    place: "Valencia",
    x: 495,
    y: 248,
    image: "/naranjo-dulce.jpg",
    description: "El Citrus sinensis es en realidad un híbrido natural entre el pomelo (Citrus maxima) y la mandarina (Citrus reticulata).",
    uses: "El naranjo dulce se aprovecha en gastronomía tanto para el consumo del fruto fresco como para la elaboración de zumos y mermeladas. En perfumería, sus flores se emplean para obtener agua de azahar, mientras que su aceite esencial se utiliza en aromaterapia por sus efectos calmantes frente al estrés y el insomnio.",
    origin: "Regiones del sur y este de españa con un clima mas cálido: Andalucía, Comunidad Valenciana y Murcia.",
    isAutochthonous: false,
    extraInfo: "Su genoma refleja esta mezcla: la parte 'dulce' viene de la mandarina y el tamaño más grande del pomelo."
  },
  {
    id: "caceres-encina",
    name: "Encina",
    scientificName: "Quercus ilex",
    place: "Cáceres",
    x: 257,
    y: 224,
    image: "/encina.jpg",
    description: "La corteza contiene compuestos con propiedades medicinales, específicamente astringentes y antisépticas.",
    uses: "La corteza es utilizada en algunos países como Marruecos en el proceso de curtir cuero, mientras que las bellotas que producen son muy valoradas para alimentar a los cerdos.",
    origin: "Mayor parte de la Península ibérica y de las Islas Baleares, es originaria de la cuenca mediterránea.",
    isAutochthonous: true,
    extraInfo: "Además, es imprescindible para la producción de trufa, que proviene de un género de hongos con el que el árbol establece una relación simbiótica."
  },
  {
    id: "guadalajara-lavanda",
    name: "Lavanda",
    scientificName: "Lavandula latifolia",
    place: "Guadalajara",
    x: 392,
    y: 196,
    image: "/lavanda.jpg",
    description: "Planta muy melífera, importante para la producción de miel de lavanda. Se recolecta tradicionalmente en verano.",
    uses: "Uso medicinal: aceite esencial con propiedades antisépticas, calmantes y cicatrizantes. Uso aromático: muy empleado en perfumería, jabones y ambientadores. Uso tradicional: en infusiones para calmar nervios, insomnio y dolores de cabeza",
    origin: "Región mediterránea: España, Portugal, sur de Francia e Italia, en zonas de matorral seco, laderas soleadas y terrenos calcáreos.",
    isAutochthonous: true,
    extraInfo: "Considerada un símbolo de la flora mediterránea y muy utilizada en jardinería ornamental por su resistencia a la sequía."
  },
  {
    id: "alicante-franchipan",
    name: "Franchipán",
    scientificName: "Plumeria rubra",
    place: "Alicante",
    x: 482,
    y: 325,
    image: "/franchipan.png",
    description: "Su capacidad de colonización es muy alta, pudiendo duplicar su población en poco tiempo.",
    uses: "Forma ornamental en jardinería, como en decoración de templos y ofrendas rituales, o para la elaboración de collares y alfombras florales. Su extracto se usa en cosmética, y las flores son comestibles en ensaladas y conservas en algunas regiones de México. También tiene usos medicinales tradicionales, como para curar heridas y contusiones",
    origin: "Planta nativa de las regiones tropicales y subtropicales de América. Aunque se ha extendido por regiones tropicales del mundo.",
    isAutochthonous: false,
    extraInfo: "Su expansión está limitada por el clima, que debe ser lo suficientemente cálido y con las condiciones adecuadas para su supervivencia. En cultivo las flores pueden ser amarillas, o en varios tonos de rosa o púrpura."
  },
  {
    id: "coruña-tojo",
    name: "Tojo",
    scientificName: "Ulex Europaeus",
    place: "A Coruña",
    x: 207,
    y: 33,
    image: "/tojo.jpg",
    description: "Espinoso, altamente inflamable, y crece todo el año",
    uses: "El tojo se ha usado tradicionalmente para hacer camas para animales y producir abono orgánico, como leña, y para fabricar carbón. También se emplea para hacer licores y artesanías, además de servir como forraje para el ganado, y sus flores se usaron en remedios medicinales (aunque su consumo es peligroso por un alcaloide tóxico) y para atraer polinizadores.",
    origin: "Europa Occidental",
    isAutochthonous: true,
    extraInfo: ""
  },
  {
    id: "murcia-limonero",
    name: "Limonero",
    scientificName: "Citrus × limon",
    place: "Murcia",
    x: 445,
    y: 341,
    image: "/limonero.jpg",
    description: "El limonero puede dar fruta casi todo el año en climas cálidos. Un solo árbol puede producir entre 200 y 600 limones anuales.",
    uses: "El limonero se usa por sus frutos en la cocina, en bebidas y repostería. Su jugo aporta vitamina C y propiedades medicinales. La cáscara sirve como aromatizante. También se aprovecha en limpieza, cosmética y como árbol ornamental.",
    origin: "El origen exacto del limonero no es del todo claro, y permanece todavía bajo un poco de misterio. Sin embargo, está extendida la idea de que los primeros limoneros crecieron en los valles del sur del Himalaya. Está distribuido por toda España.",
    isAutochthonous: true,
    extraInfo: "En Murcia se hacen los paparajotes, un postre típico en el que se rebozan hojas de limonero en masa de harina y huevo, se fríen y se espolvorean con azúcar y canela"
  }
];

// Agrupar plantas que están muy cerca (menos de 60px de distancia)
function groupNearbyPlants(plants: Plant[], threshold = 60): Map<string, Plant[]> {
  const groups = new Map<string, Plant[]>();
  const processed = new Set<string>();

  plants.forEach((plant) => {
    if (processed.has(plant.id)) return;

    const group: Plant[] = [plant];
    processed.add(plant.id);

    plants.forEach((other) => {
      if (other.id === plant.id || processed.has(other.id)) return;
      
      const distance = Math.sqrt(
        Math.pow(plant.x - other.x, 2) + Math.pow(plant.y - other.y, 2)
      );

      if (distance < threshold) {
        group.push(other);
        processed.add(other.id);
      }
    });

    const groupKey = group.map(p => p.id).sort().join(',');
    groups.set(groupKey, group);
  });

  return groups;
}

export default function Page() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const [w, setW] = useState<number>(0);
  const [h, setH] = useState<number>(0);
  const [nat, setNat] = useState<{ W: number; H: number } | null>(null);

  const [active, setActive] = useState<Plant | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);

  const plantGroups = useMemo(() => groupNearbyPlants(PLANTS), []);

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
    
    const centerX = (w * 3) / 4;
    const centerY = h / 2;
    
    setZoom(desiredZoom);
    setOffset({ 
      x: centerX - sx * desiredZoom, 
      y: centerY - sy * desiredZoom 
    });
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

  function getGroupKey(plant: Plant): string {
    for (const [key, group] of plantGroups.entries()) {
      if (group.some(p => p.id === plant.id)) return key;
    }
    return plant.id;
  }

  function getPositionInGroup(plant: Plant, groupKey: string): { x: number; y: number } {
    const group = plantGroups.get(groupKey) || [plant];
    const index = group.findIndex(p => p.id === plant.id);
    const isHovered = hoveredGroup === groupKey;

    if (group.length === 1 || !isHovered) {
      return { x: 0, y: 0 };
    }

    // Distribución en abanico cuando hay hover
    const spreadDistance = 40;
    const angleStep = 50; // grados
    const startAngle = -(angleStep * (group.length - 1)) / 2;
    const angle = (startAngle + angleStep * index) * (Math.PI / 180);

    return {
      x: Math.sin(angle) * spreadDistance,
      y: -Math.cos(angle) * spreadDistance
    };
  }

  return (
    <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 16, color: "#000" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#000", margin: 0 }}>Flora de España — Mapa Interactivo</h1>
        <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
          {PLANTS.length} especies • Haz click en cualquier planta para explorar
        </p>
      </header>

      <div ref={wrapRef} style={{ width: "100%" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: h || 500,
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
                const groupKey = getGroupKey(p);
                const group = plantGroups.get(groupKey) || [p];
                const baseLeft = p.x * scale - 24;
                const baseTop = p.y * scale - 24;
                const position = getPositionInGroup(p, groupKey);
                const isSelected = active?.id === p.id;
                const groupIndex = group.findIndex(plant => plant.id === p.id);

                return (
                  <motion.button
                    key={p.id}
                    onClick={() => {
                      setActive(p);
                      flyTo(p.x, p.y, 2.6);
                    }}
                    onMouseEnter={() => setHoveredGroup(groupKey)}
                    onMouseLeave={() => setHoveredGroup(null)}
                    animate={{
                      x: position.x,
                      y: position.y,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }}
                    style={{
                      position: "absolute",
                      left: baseLeft,
                      top: baseTop,
                      width: isSelected ? 54 : 48,
                      height: isSelected ? 54 : 48,
                      borderRadius: "50%",
                      border: isSelected ? "4px solid #10b981" : "3px solid #fff",
                      overflow: "hidden",
                      boxShadow: isSelected ? "0 12px 24px rgba(16,185,129,.3)" : "0 8px 20px rgba(0,0,0,.25)",
                      cursor: "pointer",
                      background: "transparent",
                      padding: 0,
                      zIndex: isSelected ? 100 : (hoveredGroup === groupKey ? 50 + groupIndex : group.length - groupIndex),
                    }}
                    title={`${p.name} (${p.scientificName}) — ${p.place}`}
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
                  </motion.button>
                );
              })}
          </motion.div>

          {(zoom > 1 || active) && (
            <button
              onClick={reset}
              aria-label="Volver al mapa completo"
              style={{
                position: "absolute",
                left: 12,
                bottom: 12,
                padding: "10px 16px",
                borderRadius: 999,
                border: "1px solid #ddd",
                background: "#fff",
                color: "#000",
                boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              ← Volver al mapa
            </button>
          )}

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
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#000",
                  boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                  cursor: "pointer",
                  fontSize: 20,
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
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  background: "#fff",
                  color: "#000",
                  boxShadow: "0 6px 16px rgba(0,0,0,.12)",
                  cursor: "pointer",
                  fontSize: 20,
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
              background: "rgba(0,0,0,.4)",
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
                width: "min(800px, 95vw)",
                maxHeight: "90vh",
                background: "#fff",
                borderRadius: 20,
                overflow: "auto",
                boxShadow: "0 25px 75px rgba(0,0,0,.3)",
                color: "#000",
              }}
            >
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: window.innerWidth > 768 ? "200px 1fr" : "1fr", 
                gap: 0
              }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                  }}
                >
                  <div
                    style={{
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      overflow: "hidden",
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
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#000" }}>{active.name}</h3>
                  <p style={{ margin: "4px 0 2px", color: "#64748b", fontSize: 15, fontStyle: "italic" }}>{active.scientificName}</p>
                  <p style={{ margin: "2px 0 16px", color: "#10b981", fontWeight: 600, fontSize: 14 }}>
                    📍 {active.place} • {active.isAutochthonous ? "✓ Autóctona" : "⊗ Introducida"}
                  </p>

                  <div style={{ marginBottom: 12 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Descripción</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "#334155", fontSize: 14 }}>{active.description}</p>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Usos</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "#334155", fontSize: 14 }}>{active.uses}</p>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Origen</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "#334155", fontSize: 14 }}>{active.origin}</p>
                  </div>

                  {active.extraInfo && (
                    <div style={{ marginBottom: 16 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: "#475569", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Info Extra</h4>
                      <p style={{ margin: 0, lineHeight: 1.6, color: "#334155", fontSize: 14 }}>{active.extraInfo}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                    <button
                      onClick={prevPlant}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        background: "#fff",
                        color: "#000",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      ← Anterior
                    </button>
                    <button
                      onClick={nextPlant}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        background: "#fff",
                        color: "#000",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Siguiente →
                    </button>
                    <button
                      onClick={reset}
                      style={{
                        padding: "10px 16px",
                        borderRadius: 10,
                        border: "1px solid #ddd",
                        background: "#f7f7f7",
                        color: "#000",
                        cursor: "pointer",
                        marginLeft: "auto",
                        fontWeight: 600,
                        fontSize: 14,
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
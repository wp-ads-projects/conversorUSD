"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useReducer,
  FC,
  ChangeEvent,
} from "react";
import { useExchangeRates } from "@/app/hooks/useExchangeRates";
import styles from "./CurrencyConverter.module.css";
import { TbArrowsExchange } from "react-icons/tb";
import Image from "next/image";

// Definición de tipos para acciones
interface SetFromCurrencyAction {
  type: "SET_FROM_CURRENCY";
  payload: string;
}

interface SetToCurrencyAction {
  type: "SET_TO_CURRENCY";
  payload: string;
}

interface SetAmountAction {
  type: "SET_AMOUNT";
  payload: number;
}

interface SetResultAction {
  type: "SET_RESULT";
  payload: string;
}

type Action =
  | SetFromCurrencyAction
  | SetToCurrencyAction
  | SetAmountAction
  | SetResultAction;

// Definición del estado inicial
interface State {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: string;
}

const initialState: State = {
  fromCurrency: "USD",
  toCurrency: "CLP",
  amount: 1,
  result: "0.00",
};

// Reducer con tipos explícitos
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FROM_CURRENCY":
      return { ...state, fromCurrency: action.payload };
    case "SET_TO_CURRENCY":
      return { ...state, toCurrency: action.payload };
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload };
    default:
      return state;
  }
};

// Componente principal: CurrencyConverter
const CurrencyConverter: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fromCurrency, toCurrency, amount, result } = state;

  // Obtener tasas de cambio y banderas
  const { rates, flags, date } = useExchangeRates(fromCurrency);

  // Formatear el resultado según la localización
  const formatResult = useMemo(
    () =>
      (value: number): string => {
        return new Intl.NumberFormat("es-ES", {
          minimumFractionDigits: value >= 1 ? 2 : 5,
          maximumFractionDigits: value >= 1 ? 2 : 5,
        }).format(value);
      },
    []
  );

  // Calcular el resultado cuando cambien las dependencias
  useEffect(() => {
    if (rates && rates[toCurrency]) {
      const rate = rates[toCurrency];
      const calculatedResult = amount * rate;
      dispatch({ type: "SET_RESULT", payload: formatResult(calculatedResult) });
    } else {
      dispatch({ type: "SET_RESULT", payload: "0.00" });
    }
  }, [fromCurrency, toCurrency, amount, rates, formatResult]);

  // Manejadores de eventos
  const handleSwitchCurrencies = useCallback(() => {
    if (fromCurrency !== toCurrency) {
      dispatch({ type: "SET_FROM_CURRENCY", payload: toCurrency });
      dispatch({ type: "SET_TO_CURRENCY", payload: fromCurrency });
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    dispatch({
      type: "SET_AMOUNT",
      payload: !isNaN(value) && value >= 0 ? value : 0,
    });
  }, []);

  // Opciones de divisa memoizadas
  const currencyOptions = useMemo(
    () => (rates ? Object.keys(rates) : []),
    [rates]
  );

  // Renderizado del componente
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Conversor de Divisas</h1>
        <p className={styles.headerText} aria-live="polite">
          {rates && rates[toCurrency]
            ? `1 ${fromCurrency} = ${formatResult(
                rates[toCurrency]
              )} ${toCurrency}`
            : "Cargando tasas..."}
        </p>
      </header>

      <main className={styles.main}>
        <CurrencyInputs
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={amount}
          result={result}
          handleAmountChange={handleAmountChange}
          handleSwitchCurrencies={handleSwitchCurrencies}
          currencyOptions={currencyOptions}
          flags={flags}
          setFromCurrency={(value) =>
            dispatch({ type: "SET_FROM_CURRENCY", payload: value })
          }
          setToCurrency={(value) =>
            dispatch({ type: "SET_TO_CURRENCY", payload: value })
          }
        />

        {/* Información adicional */}
        <section className={styles.historicalInfo}>
          <a
            href="#"
            className={styles.historicalInfoLink}
            download="historical-data.csv"
          >
            Descargar información histórica
          </a>
          <span className={styles.historicalInfoDate}>
            Fecha de actualización: {date}
          </span>
        </section>
      </main>
    </div>
  );
};

// Componente de Inputs de Divisa
interface CurrencyInputsProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: string;
  handleAmountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSwitchCurrencies: () => void;
  currencyOptions: string[];
  flags: { [key: string]: string };
  setFromCurrency: (value: string) => void;
  setToCurrency: (value: string) => void;
}

const CurrencyInputs: FC<CurrencyInputsProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  result,
  handleAmountChange,
  handleSwitchCurrencies,
  currencyOptions,
  flags,
  setFromCurrency,
  setToCurrency,
}) => {
  return (
    <div className={styles.currencyInputs}>
      {/* Selección de divisa de origen y cantidad */}
      <div className={styles.currencySelect}>
        <label className={styles.label} htmlFor="from-currency-select">
          De:
        </label>
        <CustomSelect
          value={fromCurrency}
          onChange={setFromCurrency}
          options={currencyOptions}
          flags={flags}
          ariaLabel="Seleccione la divisa de origen"
        />
        <label className={styles.label} htmlFor="amount-input">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount-input"
          value={amount}
          onChange={handleAmountChange}
          className={styles.input}
          aria-label="Ingrese la cantidad a convertir"
          min="0"
          step="0.01"
        />
      </div>

      {/* Botón para intercambiar divisas */}
      <button
        onClick={handleSwitchCurrencies}
        className={styles.switchButton}
        aria-label="Intercambiar divisas"
      >
        <TbArrowsExchange />
      </button>

      {/* Selección de divisa de destino y resultado */}
      <div className={styles.currencySelect}>
        <label className={styles.label} htmlFor="to-currency-select">
          A:
        </label>
        <CustomSelect
          value={toCurrency}
          onChange={setToCurrency}
          options={currencyOptions}
          flags={flags}
          ariaLabel="Seleccione la divisa de destino"
        />
        <label className={styles.label} htmlFor="result-input">
          Resultado:
        </label>
        <input
          type="text"
          id="result-input"
          value={result}
          readOnly
          className={styles.input}
          aria-readonly="true"
          aria-label="Resultado de la conversión"
        />
      </div>
    </div>
  );
};

// Interfaz para las props del CustomSelect
interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  flags: { [key: string]: string };
  ariaLabel: string;
}

// Componente CustomSelect
const CustomSelect: FC<CustomSelectProps> = React.memo(
  ({ value, onChange, options, flags, ariaLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);
    const selectedFlag = flags[value];

    // Función para alternar el menú desplegable
    const toggleDropdown = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    // Función para manejar la selección de una opción
    const handleOptionClick = useCallback(
      (option: string) => {
        onChange(option);
        setIsOpen(false);
      },
      [onChange]
    );

    // Cerrar el menú al hacer clic fuera
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className={styles.selectContainer} ref={selectRef}>
        <button
          type="button"
          className={`${styles.select} ${styles.selectWithFlag}`}
          onClick={toggleDropdown}
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{value}</span>
          {selectedFlag && (
            <FlagImage src={selectedFlag} alt={`${value} Flag`} />
          )}
        </button>
        {isOpen && (
          <ul className={styles.optionsList} role="listbox">
            {options.map((option) => (
              <li key={option} role="option" aria-selected={option === value}>
                <button
                  type="button"
                  className={styles.optionItem}
                  onClick={() => handleOptionClick(option)}
                >
                  <span>{option}</span>
                  {flags[option] && (
                    <FlagImage src={flags[option]} alt={`${option} Flag`} />
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

// Componente FlagImage para evitar repetición de código
const FlagImage: FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    className={styles.flagIcon}
    width={20}
    height={15}
  />
);

CurrencyConverter.displayName = "CurrencyConverter";
export default CurrencyConverter;

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DonationModal } from './DonationModal';
import { useTheme } from '@/contexts/ThemeContext';
import { Calculator as CalcIcon, Atom } from 'lucide-react';

type CalculatorMode = 'basic' | 'scientific';

export const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0);
  const [mode, setMode] = useState<CalculatorMode>('basic');
  const [memory, setMemory] = useState(0);
  const { theme } = useTheme();

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    setOperation(op);
    setDisplay('0');
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b;
      case '−':
        return a - b;
      case '×':
        return a * b;
      case '÷':
        return b !== 0 ? a / b : NaN;
      case '^':
        return Math.pow(a, b);
      case 'mod':
        return a % b;
      default:
        return b;
    }
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(current * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(current * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(current * Math.PI / 180);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case '√':
        result = Math.sqrt(current);
        break;
      case 'x²':
        result = current * current;
        break;
      case 'x³':
        result = current * current * current;
        break;
      case '1/x':
        result = 1 / current;
        break;
      case 'e^x':
        result = Math.exp(current);
        break;
      case '|x|':
        result = Math.abs(current);
        break;
      case 'π':
        setDisplay(String(Math.PI));
        return;
      case 'e':
        setDisplay(String(Math.E));
        return;
      case '!':
        result = factorial(Math.floor(current));
        break;
      default:
        return;
    }

    if (isNaN(result) || !isFinite(result)) {
      setDisplay('Error');
      return;
    }

    setDisplay(String(result));
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleMemory = (func: string) => {
    const current = parseFloat(display);
    switch (func) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        break;
      case 'M+':
        setMemory(memory + current);
        break;
      case 'M-':
        setMemory(memory - current);
        break;
      case 'MS':
        setMemory(current);
        break;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      
      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
        setPreviousValue(null);
        setOperation(null);
        return;
      }
      
      setDisplay(String(result));
      setDonationAmount(Math.abs(result));
      setShowModal(true);
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'basic' ? 'scientific' : 'basic');
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const opMap: { [key: string]: string } = { '+': '+', '-': '−', '*': '×', '/': '÷' };
        handleOperation(opMap[e.key]);
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleClear();
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation]);

  const buttonClass = "calc-button text-lg font-semibold h-14 rounded-[var(--radius)]";
  const numberClass = `${buttonClass} bg-calc-button hover:bg-calc-button-hover text-foreground`;
  const operatorClass = `${buttonClass} bg-calc-operator hover:bg-calc-operator-hover text-primary-foreground`;
  const scientificClass = `${buttonClass} bg-secondary hover:bg-secondary/80 text-secondary-foreground text-sm`;

  return (
    <>
      <div className={`w-full ${mode === 'scientific' ? 'max-w-3xl' : 'max-w-md'} mx-auto p-6 rounded-[var(--radius)] bg-card border-2 border-border shadow-2xl transition-all duration-300 ${theme === 'glassmorphism' ? 'glass' : ''} ${theme === 'ios' ? 'ios-theme' : ''} ${theme === 'macos' ? 'macos-theme' : ''} ${theme === 'cute-animals' ? 'cute-animals-theme' : ''}`}>
        {/* Decorative elements for cute animals theme */}
        {theme === 'cute-animals' && (
          <div className="absolute -top-8 -right-8 text-6xl paw-float opacity-50">
            🐾
          </div>
        )}
        
        {/* Mode Toggle */}
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={toggleMode}
            variant="outline"
            size="sm"
            className="gap-2 button-press"
          >
            {mode === 'basic' ? (
              <>
                <Atom className="w-4 h-4" />
                Scientific
              </>
            ) : (
              <>
                <CalcIcon className="w-4 h-4" />
                Basic
              </>
            )}
          </Button>
          
          {memory !== 0 && (
            <div className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
              M: {memory}
            </div>
          )}
        </div>

        {/* Display */}
        <div className={`calculator-display mb-6 p-6 rounded-[var(--radius)] bg-calc-display border-2 border-border ${theme === 'terminal' ? 'font-mono' : ''}`}>
          <div className="result calc-display-text text-right text-4xl font-bold text-foreground break-all min-h-[3rem] flex items-center justify-end">
            {display}
            {theme === 'terminal' && <span className="terminal-cursor ml-1">_</span>}
          </div>
          {operation && (
            <div className="text-right text-sm text-muted-foreground mt-1">
              {previousValue} {operation}
            </div>
          )}
        </div>

        {/* Calculator Layout */}
        <div className={(mode === 'scientific' ? 'calculator-buttons grid grid-cols-6 gap-2' : 'calculator-buttons grid grid-cols-4 gap-3')}>
          {/* Scientific Functions (only in scientific mode) */}
          {mode === 'scientific' && (
            <>
              {/* First column - Memory and special functions */}
              <Button onClick={() => handleMemory('MC')} className={`${scientificClass} button`}>MC</Button>
              <Button onClick={() => handleMemory('MR')} className={`${scientificClass} button`}>MR</Button>
              <Button onClick={() => handleMemory('MS')} className={`${scientificClass} button`}>MS</Button>
              <Button onClick={() => handleMemory('M+')} className={`${scientificClass} button`}>M+</Button>
              <Button onClick={() => handleMemory('M-')} className={`${scientificClass} button`}>M-</Button>
              <Button onClick={handleClear} className={`${operatorClass} button`}>C</Button>

              {/* Trig & log row (kept grouped, no main operators here) */}
              <Button onClick={() => handleScientific('sin')} className={`${scientificClass} button`}>sin</Button>
              <Button onClick={() => handleScientific('cos')} className={`${scientificClass} button`}>cos</Button>
              <Button onClick={() => handleScientific('tan')} className={`${scientificClass} button`}>tan</Button>
              <Button onClick={() => handleScientific('ln')} className={`${scientificClass} button`}>ln</Button>
              <Button onClick={() => handleScientific('log')} className={`${scientificClass} button`}>log</Button>
              <Button onClick={handleDelete} className={`${operatorClass} button`}>DEL</Button>

              {/* Row 1: x² x³ 7 8 9 ÷ */}
              <Button onClick={() => handleScientific('x²')} className={`${scientificClass} button`}>x²</Button>
              <Button onClick={() => handleScientific('x³')} className={`${scientificClass} button`}>x³</Button>
              <Button onClick={() => handleNumber('7')} className={`${numberClass} button`}>7</Button>
              <Button onClick={() => handleNumber('8')} className={`${numberClass} button`}>8</Button>
              <Button onClick={() => handleNumber('9')} className={`${numberClass} button`}>9</Button>
              <Button onClick={() => handleOperation('÷')} className={`${operatorClass} button`}>÷</Button>

              {/* Row 2: 1/x n! 4 5 6 × */}
              <Button onClick={() => handleScientific('1/x')} className={`${scientificClass} button`}>1/x</Button>
              <Button onClick={() => handleScientific('!')} className={`${scientificClass} button`}>n!</Button>
              <Button onClick={() => handleNumber('4')} className={`${numberClass} button`}>4</Button>
              <Button onClick={() => handleNumber('5')} className={`${numberClass} button`}>5</Button>
              <Button onClick={() => handleNumber('6')} className={`${numberClass} button`}>6</Button>
              <Button onClick={() => handleOperation('×')} className={`${operatorClass} button`}>×</Button>

              {/* Row 3: |x| e 1 2 3 − */}
              <Button onClick={() => handleScientific('|x|')} className={`${scientificClass} button`}>|x|</Button>
              <Button onClick={() => handleScientific('e')} className={`${scientificClass} button`}>e</Button>
              <Button onClick={() => handleNumber('1')} className={`${numberClass} button`}>1</Button>
              <Button onClick={() => handleNumber('2')} className={`${numberClass} button`}>2</Button>
              <Button onClick={() => handleNumber('3')} className={`${numberClass} button`}>3</Button>
              <Button onClick={() => handleOperation('−')} className={`${operatorClass} button`}>−</Button>

              {/* Row 4: π mod . 0 = + */}
              <Button onClick={() => handleScientific('π')} className={`${scientificClass} button`}>π</Button>
              <Button onClick={() => handleOperation('mod')} className={`${scientificClass} button`}>mod</Button>
              <Button onClick={handleDecimal} className={`${numberClass} button`}>.</Button>
              <Button onClick={() => handleNumber('0')} className={`${numberClass} button`}>0</Button>
              <Button onClick={handleEquals} className={`${operatorClass} button`}>=</Button>
              <Button onClick={() => handleOperation('+')} className={`${operatorClass} button`}>+</Button>
            </>
          )}

          {/* Basic Mode Layout */}
          {mode === 'basic' && (
            <>
              <Button onClick={handleClear} className={operatorClass}>C</Button>
              <Button onClick={handleDelete} className={operatorClass}>DEL</Button>
              <Button onClick={() => handleOperation('÷')} className={operatorClass}>÷</Button>
              <Button onClick={() => handleOperation('×')} className={operatorClass}>×</Button>

              <Button onClick={() => handleNumber('7')} className={numberClass}>7</Button>
              <Button onClick={() => handleNumber('8')} className={numberClass}>8</Button>
              <Button onClick={() => handleNumber('9')} className={numberClass}>9</Button>
              <Button onClick={() => handleOperation('−')} className={operatorClass}>−</Button>

              <Button onClick={() => handleNumber('4')} className={numberClass}>4</Button>
              <Button onClick={() => handleNumber('5')} className={numberClass}>5</Button>
              <Button onClick={() => handleNumber('6')} className={numberClass}>6</Button>
              <Button onClick={() => handleOperation('+')} className={operatorClass}>+</Button>

              <Button onClick={() => handleNumber('1')} className={numberClass}>1</Button>
              <Button onClick={() => handleNumber('2')} className={numberClass}>2</Button>
              <Button onClick={() => handleNumber('3')} className={numberClass}>3</Button>
              <Button onClick={handleEquals} className={`${operatorClass} row-span-2`}>=</Button>

              <Button onClick={() => handleNumber('0')} className={`${numberClass} col-span-2`}>0</Button>
              <Button onClick={handleDecimal} className={numberClass}>.</Button>
            </>
          )}
        </div>

        {theme === 'cute-animals' && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            🐶 Press = to help animals! 🐱
          </div>
        )}
      </div>

      <DonationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        amount={donationAmount}
      />
    </>
  );
};

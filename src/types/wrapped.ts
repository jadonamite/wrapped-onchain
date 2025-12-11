export interface WrappedSummary {
  wallet: string;
  year: number;
  summary: {
    total_tx: number;
    active_days: number;
    total_gas_usd: string; // It comes as a string "0.00"
    first_tx_date: string;
    last_tx_date: string;
  };
  favorites: {
    top_chain: string;
    top_chain_count: number;
  };
  persona: {
    title: string;
    description: string;
    color_theme: string;
  };
}
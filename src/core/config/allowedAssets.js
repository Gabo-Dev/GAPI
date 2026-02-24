export const ALLOWED_CRYPTOS = {
    BITCOIN: 'Qwsogvtv82FCd',
    PI_NETWORK: '54I_A3MXKhHjZ',
}

export const ALLOWED_UUIDS = Object.values(ALLOWED_CRYPTOS);

export const ASSET_METADATA = [
    { 
        id: ALLOWED_CRYPTOS.BITCOIN, 
        symbol: 'BTC', 
        name: 'Bitcoin', 
        color: '#f7931A' 
    },
    { 
        id: ALLOWED_CRYPTOS.PI_NETWORK, 
        symbol: 'PI', 
        name: 'Pi Network', 
        color: '#402867' 
    }
];

export const ALLOWED_PERIODS = ['24h', '7d', '30d', '1y'];
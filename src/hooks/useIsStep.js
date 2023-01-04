export default function useIsStep() {
    return (option) => {
        if (option === 'common' || option === 'conditional' || option === 'start' || option === 'successfulEnd' ) {
            return true;
        }
        return false;
    }
}

import React from 'react';

export const SafeAreaView = ({style, children, onScroll, id}) => {

    return (
        <div id={id} style={{...styles.container, ...style}} onScroll={onScroll}>
            {children}
        </div>
    )
}

const styles = {
    container: {
        overflow: 'scroll',
        position: 'relative', width: '100vw', height: 'calc(100vh - env(safe-area-inset-bottom))', top: 0, left: 0,
    },
}
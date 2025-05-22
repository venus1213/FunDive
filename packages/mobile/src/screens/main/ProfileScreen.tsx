import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/auth';
import { Button } from '../../components/ui/Button';

export const ProfileScreen = () => {
  const { user, signOut } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* プロフィールヘッダー */}
        <View style={styles.header}>
          <Image
            source={{ uri: user?.photoURL || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.displayName || 'ゲスト'}</Text>
          <Text style={styles.email}>{user?.email || ''}</Text>
        </View>

        {/* スキルセクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>スキル</Text>
          <View style={styles.skillList}>
            <View style={styles.skillItem}>
              <Text style={styles.skillText}>React Native</Text>
            </View>
            <View style={styles.skillItem}>
              <Text style={styles.skillText}>TypeScript</Text>
            </View>
            <View style={styles.skillItem}>
              <Text style={styles.skillText}>Firebase</Text>
            </View>
          </View>
        </View>

        {/* 自己紹介セクション */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>自己紹介</Text>
          <Text style={styles.bio}>
            モバイルアプリ開発に興味があり、特にReact Nativeを使用したクロスプラットフォーム開発を得意としています。
            新しい技術の学習や、チームでの開発に積極的に取り組んでいます。
          </Text>
        </View>

        {/* ログアウトボタン */}
        <View style={styles.buttonContainer}>
          <Button
            title="ログアウト"
            onPress={signOut}
            variant="outline"
            style={styles.button}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillItem: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  skillText: {
    color: '#4b5563',
    fontSize: 14,
  },
  bio: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 20,
  },
  button: {
    marginTop: 20,
  },
}); 